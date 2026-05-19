import { buildSimplePdf, type PdfLine } from "../pdf-builder";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const lines: PdfLine[] = [
  { text: "Ricardo Zulkiewicz CV | EN", x: 56, y: 748, size: 18, font: "bold" },
  { text: "Account Executive | B2B Sales, Outbound & CRM | Technology & IT Outsourcing", x: 56, y: 728, size: 9.5 },
  { text: "Sao Paulo, Brazil | WhatsApp | ricardomachado.zulk@gmail.com | ricardozulkiewicz.com | linkedin.com/in/rick-zulk", x: 56, y: 712, size: 8 },

  { text: "EXECUTIVE SUMMARY", x: 56, y: 684, size: 11, font: "bold" },
  { text: "Account Executive with experience in consultative B2B sales, outbound, CRM, and commercial structuring for technology, startups, and IT Outsourcing.", x: 56, y: 668, size: 8.5 },
  { text: "Full-cycle background across prospecting, discovery, qualification, proposal, negotiation, and closing, with R$35k to R$120k deal sizes.", x: 56, y: 655, size: 8.5 },
  { text: "Approximately 5 deals/month and a mostly outbound-generated pipeline. Profile combines execution, ICP analysis, decision-maker engagement and process building.", x: 56, y: 642, size: 8.5 },

  { text: "KEY METRICS", x: 56, y: 616, size: 11, font: "bold" },
  { text: "5 deals/month - approximate average closings at Talentu", x: 56, y: 600, size: 8.8 },
  { text: "R$35k - R$120k - commercial deal size range", x: 56, y: 587, size: 8.8 },
  { text: "80% outbound - approximate pipeline source", x: 56, y: 574, size: 8.8 },
  { text: "~R$320k/month - approximate closed TCV average at Talentu", x: 56, y: 561, size: 8.8 },

  { text: "PROFESSIONAL EXPERIENCE", x: 56, y: 535, size: 11, font: "bold" },
  { text: "Account Executive | First Decision | 2026 - Present", x: 56, y: 519, size: 9.3, font: "bold" },
  { text: "B2B sales for technology and IT Outsourcing, focused on outbound, new business, CRM, pipeline, and private-market entry.", x: 56, y: 505, size: 8.5 },
  { text: "Built the commercial approach for the private outsourcing unit: ICP, priority segments, cadences, qualification criteria and support materials.", x: 56, y: 492, size: 8.5 },
  { text: "Organized commercial governance in Pipedrive, standardizing pipeline stages, relationship history, activities, follow-ups and opportunities.", x: 56, y: 479, size: 8.5 },
  { text: "Created CRM materials and guides to support adoption, sales predictability, and team alignment.", x: 56, y: 466, size: 8.5 },

  { text: "Account Executive | Talentu | 2023 - 2025", x: 56, y: 444, size: 9.3, font: "bold" },
  { text: "Led end-to-end consultative B2B sales for startups, scale-ups, and companies undergoing digital transformation.", x: 56, y: 430, size: 8.5 },
  { text: "Engaged C-level executives, HR leaders, and founders in strategic meetings, diagnosis, proposals, negotiation and closing.", x: 56, y: 417, size: 8.5 },
  { text: "Managed a pipeline with roughly 80% outbound origin, 30-45 day average sales cycle, R$35k to R$120k deal sizes and 5 deals/month.", x: 56, y: 404, size: 8.5 },
  { text: "Generated an approximate average of R$320k/month in TCV, ranging from R$180k to R$500k.", x: 56, y: 391, size: 8.5 },

  { text: "Business Development Representative | Talentu | 2022 - 2023", x: 56, y: 369, size: 9.3, font: "bold" },
  { text: "Prospecting, qualification, market mapping, and generation of qualified sales conversations for the commercial team.", x: 56, y: 355, size: 8.5 },
  { text: "Supported ICP definition, market research, outbound cadences, and handoff of qualified opportunities.", x: 56, y: 342, size: 8.5 },

  { text: "SELECTED PROJECTS", x: 56, y: 316, size: 11, font: "bold" },
  { text: "Pipeline structuring and Pipedrive governance for a B2B commercial operation, with stage-advance criteria and opportunity tracking.", x: 56, y: 300, size: 8.5 },
  { text: "Created Sales Enablement materials: playbooks, one-pagers, sales scripts and CRM guides.", x: 56, y: 287, size: 8.5 },

  { text: "CORE SKILLS", x: 56, y: 261, size: 11, font: "bold" },
  { text: "Consultative B2B Sales | Outbound | Discovery | Qualification | Negotiation | CRM | Pipeline | Forecasting | Sales Enablement", x: 56, y: 245, size: 8.5 },
  { text: "TOOLS: Pipedrive CRM | LinkedIn | Google Workspace | Calendly | Slack", x: 56, y: 226, size: 8.5 },
  { text: "LANGUAGES: Portuguese native | English professional | Spanish basic", x: 56, y: 207, size: 8.5 },
  { text: "ADDITIONAL EXPERIENCE: Volunteer Consultant - NAPEN: strategic consulting for small businesses.", x: 56, y: 188, size: 8.5 },

  { text: "ricardozulkiewicz.com | English CV - website version", x: 56, y: 42, size: 8 },
];

export function GET() {
  const pdfBuffer = buildSimplePdf(lines);

  return new Response(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Ricardo_Zulkiewicz_CV_EN.pdf"',
      "Cache-Control": "no-store, max-age=0",
    },
  });
}
