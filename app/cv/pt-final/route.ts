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
  { text: "Account Executive | Vendas B2B, Outbound & CRM | Tecnologia & IT Outsourcing", x: 62, y: 720, size: 8.7, color: navy as any },
  { text: "Sao Paulo, Brasil   |   WhatsApp   |   ricardomachado.zulk@gmail.com   |   ricardozulkiewicz.com   |   linkedin.com/in/rick-zulk", x: 62, y: 706, size: 6.7, color: slate as any },
  { text: "RZ", x: 528, y: 718, size: 17, font: "bold", color: [1, 1, 1] },

  { text: "5 deals/mes", x: 82, y: 650, size: 11, font: "bold", color: navy as any },
  { text: "media aproximada na Talentu", x: 74, y: 639, size: 5.6, color: muted as any },
  { text: "R$35k - R$120k", x: 204, y: 650, size: 11, font: "bold", color: navy as any },
  { text: "faixa de ticket comercial", x: 212, y: 639, size: 5.6, color: muted as any },
  { text: "80% outbound", x: 334, y: 650, size: 11, font: "bold", color: navy as any },
  { text: "origem aproximada do pipeline", x: 326, y: 639, size: 5.6, color: muted as any },
  { text: "~R$320k/mes", x: 462, y: 650, size: 11, font: "bold", color: navy as any },
  { text: "media aproximada de TCV", x: 465, y: 639, size: 5.6, color: muted as any },

  { text: "RESUMO EXECUTIVO", x: 58, y: 604, size: 10, font: "bold", color: navy as any },
  { text: "Account Executive com experiencia em vendas consultivas B2B, outbound, CRM e estruturacao comercial para tecnologia, startups e IT Outsourcing.", x: 58, y: 591, size: 7.1, color: slate as any },
  { text: "Atuacao full-cycle em prospeccao, discovery, qualificacao, proposta, negociacao e fechamento, com tickets de R$35k a R$120k.", x: 58, y: 581, size: 7.1, color: slate as any },
  { text: "Perfil combina execucao comercial, leitura de ICP, relacionamento com decisores e construcao de processos para previsibilidade.", x: 58, y: 571, size: 7.1, color: slate as any },

  { text: "EXPERIENCIA PROFISSIONAL", x: 58, y: 550, size: 10, font: "bold", color: navy as any },

  { text: "Account Executive", x: 66, y: 486, size: 8.3, font: "bold", color: navy as any },
  { text: "First Decision", x: 66, y: 476, size: 6.8, color: muted as any },
  { text: "2026 - atual", x: 484, y: 486, size: 6.8, color: muted as any },
  { text: "• Vendas B2B para tecnologia e IT Outsourcing, com foco em outbound, new business, CRM, pipeline e mercado privado.", x: 66, y: 462, size: 6.9, color: slate as any },
  { text: "• Construcao da abordagem comercial: ICP, segmentos prioritarios, cadencias, criterios de qualificacao e materiais de apoio.", x: 66, y: 452, size: 6.9, color: slate as any },
  { text: "• Governanca comercial em Pipedrive, padronizando etapas de pipeline, historico, atividades, follow-ups e oportunidades.", x: 66, y: 442, size: 6.9, color: slate as any },
  { text: "• Criacao de materiais e guias de CRM para apoiar adocao, previsibilidade comercial e alinhamento do time.", x: 66, y: 432, size: 6.9, color: slate as any },
  { text: "IT Outsourcing     Outbound     CRM     New Business", x: 66, y: 421, size: 6.3, color: muted as any },

  { text: "Account Executive", x: 66, y: 394, size: 8.3, font: "bold", color: navy as any },
  { text: "Talentu", x: 66, y: 384, size: 6.8, color: muted as any },
  { text: "2023 - 2025", x: 484, y: 394, size: 6.8, color: muted as any },
  { text: "• Conducao end-to-end de vendas consultivas B2B para startups, scale-ups e empresas em transformacao digital.", x: 66, y: 370, size: 6.9, color: slate as any },
  { text: "• Atuacao com C-level, RH e founders em reunioes estrategicas, diagnostico, proposta, negociacao e fechamento.", x: 66, y: 360, size: 6.9, color: slate as any },
  { text: "• Pipeline com cerca de 80% outbound, ciclo medio de 30-45 dias, tickets R$35k a R$120k e media de 5 deals/mes.", x: 66, y: 350, size: 6.9, color: slate as any },
  { text: "• Geracao media aproximada de R$320k/mes em TCV, com variacao entre R$180k e R$500k.", x: 66, y: 340, size: 6.9, color: slate as any },
  { text: "Full-cycle Sales     B2B     Startups     Vendas Consultivas", x: 66, y: 329, size: 6.3, color: muted as any },

  { text: "Business Development Representative", x: 66, y: 282, size: 8.3, font: "bold", color: navy as any },
  { text: "Talentu", x: 66, y: 272, size: 6.8, color: muted as any },
  { text: "2022 - 2023", x: 484, y: 282, size: 6.8, color: muted as any },
  { text: "• Prospeccao, qualificacao, mapeamento de mercado e geracao de conversas qualificadas para o time comercial.", x: 66, y: 258, size: 6.9, color: slate as any },
  { text: "• Apoio na definicao de ICP, pesquisa de mercado, cadencias outbound e passagem de oportunidades qualificadas.", x: 66, y: 248, size: 6.9, color: slate as any },
  { text: "Prospecting     Qualification     Market Mapping     BDR", x: 66, y: 235, size: 6.3, color: muted as any },

  { text: "PROJETOS SELECIONADOS", x: 60, y: 180, size: 10, font: "bold", color: navy as any },
  { text: "• Estruturacao de pipeline e governanca de Pipedrive para operacao comercial B2B,", x: 62, y: 164, size: 6.9, color: slate as any },
  { text: "  com criterios de avanco e acompanhamento de oportunidades.", x: 62, y: 154, size: 6.9, color: slate as any },
  { text: "• Criacao de materiais de Sales Enablement: playbooks, one-pagers, roteiros", x: 62, y: 140, size: 6.9, color: slate as any },
  { text: "  comerciais e guias de CRM para padronizar abordagem e follow-up.", x: 62, y: 130, size: 6.9, color: slate as any },

  { text: "COMPETENCIAS", x: 356, y: 180, size: 10, font: "bold", color: navy as any },
  { text: "Vendas consultivas B2B | Outbound | Discovery", x: 356, y: 164, size: 6.9, color: slate as any },
  { text: "Qualificacao | Negociacao | CRM | Pipeline", x: 356, y: 154, size: 6.9, color: slate as any },
  { text: "Forecast | Sales Enablement", x: 356, y: 144, size: 6.9, color: slate as any },

  { text: "FERRAMENTAS", x: 356, y: 124, size: 9, font: "bold", color: navy as any },
  { text: "Pipedrive CRM | LinkedIn | Google Workspace", x: 356, y: 111, size: 6.9, color: slate as any },
  { text: "Calendly | Slack", x: 356, y: 101, size: 6.9, color: slate as any },

  { text: "IDIOMAS", x: 356, y: 82, size: 9, font: "bold", color: navy as any },
  { text: "Portugues: Nativo | Ingles: Profissional | Espanhol: Basico", x: 356, y: 69, size: 6.9, color: slate as any },

  { text: "ricardozulkiewicz.com | CV em portugues - versao premium para site", x: 210, y: 48, size: 5.8, color: muted as any },
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
      "Content-Disposition": 'attachment; filename="Ricardo_Zulkiewicz_CV_PT_PREMIUM_SITE.pdf"',
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}
