import { buildSimplePdf, type PdfBox, type PdfLine, type PdfLink } from "../pdf-builder";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const navy = [0.02, 0.12, 0.24] as const;
const slate = [0.12, 0.22, 0.34] as const;
const muted = [0.32, 0.42, 0.55] as const;
const border = [0.78, 0.84, 0.9] as const;

const boxes: PdfBox[] = [
  { x: 52, y: 628, width: 508, height: 40, fill: [0.97, 0.985, 1], stroke: border as any },
  { x: 52, y: 416, width: 508, height: 86, fill: [1, 1, 1], stroke: border as any },
  { x: 52, y: 304, width: 508, height: 106, fill: [1, 1, 1], stroke: border as any },
  { x: 52, y: 224, width: 508, height: 74, fill: [1, 1, 1], stroke: border as any },
  { x: 52, y: 92, width: 288, height: 104, fill: [0.98, 0.99, 1], stroke: border as any },
  { x: 348, y: 92, width: 212, height: 104, fill: [0.98, 0.99, 1], stroke: border as any },
  { x: 520, y: 704, width: 42, height: 42, fill: navy as any, stroke: navy as any },
  { x: 52, y: 627.7, width: 127, height: 40.6, stroke: border as any },
  { x: 179, y: 627.7, width: 127, height: 40.6, stroke: border as any },
  { x: 306, y: 627.7, width: 127, height: 40.6, stroke: border as any },
  { x: 433, y: 627.7, width: 127, height: 40.6, stroke: border as any },
];

const lines: PdfLine[] = [
  { text: "Ricardo Zulkiewicz", x: 62, y: 738, size: 21, font: "bold", color: navy as any },
  { text: "Account Executive | B2B Sales, Outbound & CRM | Technology & IT Outsourcing", x: 62, y: 720, size: 8.7, color: navy as any },
  { text: "Sao Paulo, Brazil   |   WhatsApp   |   ricardomachado.zulk@gmail.com   |   ricardozulkiewicz.com   |   linkedin.com/in/rick-zulk", x: 62, y: 706, size: 6.7, color: slate as any },
  { text: "RZ", x: 528, y: 718, size: 17, font: "bold", color: [1, 1, 1] },

  { text: "5 deals/month", x: 78, y: 650, size: 11, font: "bold", color: navy as any },
  { text: "approx. closings at Talentu", x: 75, y: 639, size: 5.6, color: muted as any },
  { text: "R$35k - R$120k", x: 204, y: 650, size: 11, font: "bold", color: navy as any },
  { text: "commercial deal range", x: 216, y: 639, size: 5.6, color: muted as any },
  { text: "80% outbound", x: 334, y: 650, size: 11, font: "bold", color: navy as any },
  { text: "approx. pipeline source", x: 333, y: 639, size: 5.6, color: muted as any },
  { text: "~R$320k/month", x: 456, y: 650, size: 11, font: "bold", color: navy as any },
  { text: "approx. closed TCV", x: 470, y: 639, size: 5.6, color: muted as any },

  { text: "EXECUTIVE SUMMARY", x: 58, y: 604, size: 10, font: "bold", color: navy as any },
  { text: "Account Executive with experience in consultative B2B sales, outbound, CRM, and commercial structuring for technology and IT Outsourcing.", x: 58, y: 591, size: 7.1, color: slate as any },
  { text: "Full-cycle background across prospecting, discovery, qualification, proposal, negotiation, and closing, with R$35k to R$120k deal sizes.", x: 58, y: 581, size: 7.1, color: slate as any },
  { text: "Profile combines commercial execution, ICP analysis, decision-maker engagement, and process building to support revenue predictability.", x: 58, y: 571, size: 7.1, color: slate as any },

  { text: "PROFESSIONAL EXPERIENCE", x: 58, y: 550, size: 10, font: "bold", color: navy as any },

  { text: "Account Executive", x: 66, y: 486, size: 8.3, font: "bold", color: navy as any },
  { text: "First Decision", x: 66, y: 476, size: 6.8, color: muted as any },
  { text: "2026 - Present", x: 484, y: 486, size: 6.8, color: muted as any },
  { text: "• B2B sales for technology and IT Outsourcing, focused on outbound, new business, CRM, pipeline and private-market entry.", x: 66, y: 462, size: 6.9, color: slate as any },
  { text: "• Built the commercial approach for the private outsourcing unit: ICP, priority segments, cadences and qualification criteria.", x: 66, y: 452, size: 6.9, color: slate as any },
  { text: "• Organized commercial governance in Pipedrive: pipeline stages, relationship history, activities, follow-ups and opportunities.", x: 66, y: 442, size: 6.9, color: slate as any },
  { text: "• Created CRM materials and guides to support adoption, sales predictability and team alignment.", x: 66, y: 432, size: 6.9, color: slate as any },
  { text: "IT Outsourcing     Outbound     CRM     New Business", x: 66, y: 421, size: 6.3, color: muted as any },

  { text: "Account Executive", x: 66, y: 394, size: 8.3, font: "bold", color: navy as any },
  { text: "Talentu", x: 66, y: 384, size: 6.8, color: muted as any },
  { text: "2023 - 2025", x: 484, y: 394, size: 6.8, color: muted as any },
  { text: "• Led end-to-end consultative B2B sales for startups, scale-ups and companies undergoing digital transformation.", x: 66, y: 370, size: 6.9, color: slate as any },
  { text: "• Engaged C-level executives, HR leaders and founders in strategic meetings, diagnosis, proposals, negotiation and closing.", x: 66, y: 360, size: 6.9, color: slate as any },
  { text: "• Managed a mostly outbound pipeline, 30-45 day average sales cycle, R$35k to R$120k deal sizes and 5 deals/month.", x: 66, y: 350, size: 6.9, color: slate as any },
  { text: "• Generated an approximate average of R$320k/month in TCV, ranging from R$180k to R$500k.", x: 66, y: 340, size: 6.9, color: slate as any },
  { text: "Full-cycle Sales     B2B     Startups     Consultative Sales", x: 66, y: 329, size: 6.3, color: muted as any },

  { text: "Business Development Representative", x: 66, y: 282, size: 8.3, font: "bold", color: navy as any },
  { text: "Talentu", x: 66, y: 272, size: 6.8, color: muted as any },
  { text: "2022 - 2023", x: 484, y: 282, size: 6.8, color: muted as any },
  { text: "• Prospecting, qualification, market mapping and generation of qualified sales conversations for the commercial team.", x: 66, y: 258, size: 6.9, color: slate as any },
  { text: "• Supported ICP definition, market research, outbound cadences and handoff of qualified opportunities.", x: 66, y: 248, size: 6.9, color: slate as any },
  { text: "Prospecting     Qualification     Market Mapping     BDR", x: 66, y: 235, size: 6.3, color: muted as any },

  { text: "SELECTED PROJECTS", x: 60, y: 180, size: 10, font: "bold", color: navy as any },
  { text: "• Pipeline structuring and Pipedrive governance for a B2B commercial operation,", x: 62, y: 164, size: 6.9, color: slate as any },
  { text: "  with stage-advance criteria and opportunity tracking.", x: 62, y: 154, size: 6.9, color: slate as any },
  { text: "• Created Sales Enablement materials: playbooks, one-pagers, sales scripts", x: 62, y: 140, size: 6.9, color: slate as any },
  { text: "  and CRM guides to standardize approach and follow-up.", x: 62, y: 130, size: 6.9, color: slate as any },

  { text: "CORE SKILLS", x: 356, y: 180, size: 10, font: "bold", color: navy as any },
  { text: "Consultative B2B Sales | Outbound | Discovery", x: 356, y: 164, size: 6.9, color: slate as any },
  { text: "Qualification | Negotiation | CRM | Pipeline", x: 356, y: 154, size: 6.9, color: slate as any },
  { text: "Forecasting | Sales Enablement", x: 356, y: 144, size: 6.9, color: slate as any },

  { text: "TOOLS", x: 356, y: 124, size: 9, font: "bold", color: navy as any },
  { text: "Pipedrive CRM | LinkedIn | Google Workspace", x: 356, y: 111, size: 6.9, color: slate as any },
  { text: "Calendly | Slack", x: 356, y: 101, size: 6.9, color: slate as any },

  { text: "LANGUAGES", x: 356, y: 82, size: 9, font: "bold", color: navy as any },
  { text: "Portuguese: Native | English: Professional | Spanish: Basic", x: 356, y: 69, size: 6.9, color: slate as any },

  { text: "ricardozulkiewicz.com | English CV - premium website version", x: 212, y: 48, size: 5.8, color: muted as any },
];

const links: PdfLink[] = [
  { url: "https://wa.me/5511992881425", x: 120, y: 702, width: 44, height: 10 },
  { url: "https://mail.google.com/mail/?view=cm&fs=1&to=ricardomachado.zulk%40gmail.com", x: 174, y: 702, width: 126, height: 10 },
  { url: "https://ricardozulkiewicz.com", x: 310, y: 702, width: 86, height: 10 },
  { url: "https://www.linkedin.com/in/rick-zulk/", x: 406, y: 702, width: 112, height: 10 },
];

export function GET() {
  const pdfBuffer = buildSimplePdf(lines, links, { boxes });

  return new Response(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Ricardo_Zulkiewicz_CV_EN_PREMIUM_SITE.pdf"',
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}
