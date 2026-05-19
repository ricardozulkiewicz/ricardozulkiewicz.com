export type PdfColor = [number, number, number];

export type PdfLine = {
  text: string;
  x?: number;
  y?: number;
  size?: number;
  font?: "regular" | "bold";
  color?: PdfColor;
};

export type PdfBox = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill?: PdfColor;
  stroke?: PdfColor;
  lineWidth?: number;
};

export type PdfLink = {
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type PdfOptions = {
  boxes?: PdfBox[];
};

function escapePdfText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function rgb(color: PdfColor) {
  return color.map((value) => String(value)).join(" ");
}

function buildBox(box: PdfBox) {
  const commands: string[] = ["q"];
  commands.push(`${box.lineWidth ?? 0.6} w`);

  if (box.fill) {
    commands.push(`${rgb(box.fill)} rg`);
  }

  if (box.stroke) {
    commands.push(`${rgb(box.stroke)} RG`);
  }

  commands.push(`${box.x} ${box.y} ${box.width} ${box.height} re`);

  if (box.fill && box.stroke) {
    commands.push("B");
  } else if (box.fill) {
    commands.push("f");
  } else {
    commands.push("S");
  }

  commands.push("Q");
  return commands.join("\n");
}

function buildText(line: PdfLine) {
  const font = line.font === "bold" ? "F2" : "F1";
  const size = line.size ?? 9.5;
  const x = line.x ?? 56;
  const y = line.y ?? 720;
  const color = line.color ?? [0, 0, 0];
  return `q\n${rgb(color)} rg\nBT /${font} ${size} Tf ${x} ${y} Td (${escapePdfText(line.text)}) Tj ET\nQ`;
}

export function buildSimplePdf(lines: PdfLine[], links: PdfLink[] = [], options: PdfOptions = {}) {
  const width = 612;
  const height = 792;

  const graphicsContent = (options.boxes ?? []).map(buildBox).join("\n");
  const textContent = lines.map(buildText).join("\n");
  const content = [graphicsContent, textContent].filter(Boolean).join("\n");

  const annotationRefs = links
    .map((_, index) => `${7 + index} 0 R`)
    .join(" ");
  const annotations = annotationRefs ? ` /Annots [${annotationRefs}]` : "";

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${width} ${height}] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R${annotations} >>`,
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    `<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}\nendstream`,
    ...links.map((link) => {
      const x1 = link.x;
      const y1 = link.y;
      const x2 = link.x + link.width;
      const y2 = link.y + link.height;
      return `<< /Type /Annot /Subtype /Link /Rect [${x1} ${y1} ${x2} ${y2}] /Border [0 0 0] /A << /S /URI /URI (${escapePdfText(link.url)}) >> >>`;
    }),
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  objects.forEach((object, index) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${index + 1} 0 obj\n${object}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";

  offsets.slice(1).forEach((offset) => {
    pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
  });

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  return Buffer.from(pdf, "latin1");
}
