import { buildSimplePdf, type PdfLine, type PdfLink } from "../pdf-builder";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const lines: PdfLine[] = [
  { text: "Ricardo Zulkiewicz CV | PT-BR", x: 56, y: 748, size: 18, font: "bold" },
  { text: "Account Executive | Vendas B2B, Outbound & CRM | Tecnologia & IT Outsourcing", x: 56, y: 728, size: 9.5 },
  { text: "Sao Paulo, Brasil | WhatsApp | ricardomachado.zulk@gmail.com | ricardozulkiewicz.com | linkedin.com/in/rick-zulk", x: 56, y: 712, size: 8 },

  { text: "RESUMO EXECUTIVO", x: 56, y: 684, size: 11, font: "bold" },
  { text: "Account Executive com experiencia em vendas consultivas B2B, outbound, CRM e estruturacao comercial para tecnologia, startups e IT Outsourcing.", x: 56, y: 668, size: 8.7 },
  { text: "Atuacao full-cycle em prospeccao, discovery, qualificacao, proposta, negociacao e fechamento, com tickets de R$35k a R$120k.", x: 56, y: 655, size: 8.7 },
  { text: "Media aproximada de 5 deals/mes e pipeline majoritariamente outbound. Perfil combina execucao comercial, ICP, decisores e processos.", x: 56, y: 642, size: 8.7 },

  { text: "INDICADORES", x: 56, y: 616, size: 11, font: "bold" },
  { text: "5 deals/mes - media aproximada de fechamentos na Talentu", x: 56, y: 600, size: 8.8 },
  { text: "R$35k - R$120k - faixa de ticket comercial", x: 56, y: 587, size: 8.8 },
  { text: "80% outbound - origem aproximada do pipeline", x: 56, y: 574, size: 8.8 },
  { text: "~R$320k/mes - media aproximada de TCV na Talentu", x: 56, y: 561, size: 8.8 },

  { text: "EXPERIENCIA PROFISSIONAL", x: 56, y: 535, size: 11, font: "bold" },
  { text: "Account Executive | First Decision | 2026 - atual", x: 56, y: 519, size: 9.3, font: "bold" },
  { text: "Vendas B2B para tecnologia e IT Outsourcing, com foco em outbound, new business, CRM, pipeline e mercado privado.", x: 56, y: 505, size: 8.5 },
  { text: "Construcao da abordagem comercial: ICP, segmentos prioritarios, cadencias, criterios de qualificacao e materiais de apoio.", x: 56, y: 492, size: 8.5 },
  { text: "Organizacao de governanca em Pipedrive: etapas de pipeline, historico, atividades, follow-ups e gestao de oportunidades.", x: 56, y: 479, size: 8.5 },
  { text: "Criacao de materiais e guias de CRM para apoiar adocao, previsibilidade comercial e alinhamento do time.", x: 56, y: 466, size: 8.5 },

  { text: "Account Executive | Talentu | 2023 - 2025", x: 56, y: 444, size: 9.3, font: "bold" },
  { text: "Conducao end-to-end de vendas consultivas B2B para startups, scale-ups e empresas em transformacao digital.", x: 56, y: 430, size: 8.5 },
  { text: "Atuacao com C-level, RH e founders em reunioes estrategicas, diagnostico, proposta, negociacao e fechamento.", x: 56, y: 417, size: 8.5 },
  { text: "Pipeline com cerca de 80% outbound, ciclo medio de 30-45 dias, tickets R$35k a R$120k e media de 5 deals/mes.", x: 56, y: 404, size: 8.5 },
  { text: "Geracao media aproximada de R$320k/mes em TCV, com variacao entre R$180k e R$500k.", x: 56, y: 391, size: 8.5 },

  { text: "Business Development Representative | Talentu | 2022 - 2023", x: 56, y: 369, size: 9.3, font: "bold" },
  { text: "Prospeccao, qualificacao, mapeamento de mercado e geracao de conversas qualificadas para o time comercial.", x: 56, y: 355, size: 8.5 },
  { text: "Apoio na definicao de ICP, pesquisa de mercado, cadencias outbound e passagem de oportunidades qualificadas.", x: 56, y: 342, size: 8.5 },

  { text: "PROJETOS SELECIONADOS", x: 56, y: 316, size: 11, font: "bold" },
  { text: "Estruturacao de pipeline e governanca de Pipedrive para operacao comercial B2B, com criterios de avanco.", x: 56, y: 300, size: 8.5 },
  { text: "Criacao de materiais de Sales Enablement: playbooks, one-pagers, roteiros comerciais e guias de CRM.", x: 56, y: 287, size: 8.5 },

  { text: "COMPETENCIAS", x: 56, y: 261, size: 11, font: "bold" },
  { text: "Vendas consultivas B2B | Outbound | Discovery | Qualificacao | Negociacao | CRM | Pipeline | Forecast | Sales Enablement", x: 56, y: 245, size: 8.5 },
  { text: "FERRAMENTAS: Pipedrive CRM | LinkedIn | Google Workspace | Calendly | Slack", x: 56, y: 226, size: 8.5 },
  { text: "IDIOMAS: Portugues nativo | Ingles profissional | Espanhol basico", x: 56, y: 207, size: 8.5 },
  { text: "EXPERIENCIA ADICIONAL: Consultor Voluntario - NAPEN: consultoria estrategica para pequenos negocios.", x: 56, y: 188, size: 8.5 },

  { text: "ricardozulkiewicz.com | CV em portugues - versao final para site", x: 56, y: 42, size: 8 },
];

const links: PdfLink[] = [
  { url: "https://wa.me/5511992881425", x: 152, y: 708, width: 42, height: 14 },
  { url: "mailto:ricardomachado.zulk@gmail.com", x: 200, y: 708, width: 148, height: 14 },
  { url: "https://ricardozulkiewicz.com", x: 354, y: 708, width: 102, height: 14 },
  { url: "https://www.linkedin.com/in/rick-zulk/", x: 462, y: 708, width: 94, height: 14 },
];

export function GET() {
  const pdfBuffer = buildSimplePdf(lines, links);

  return new Response(new Uint8Array(pdfBuffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Ricardo_Zulkiewicz_CV_PT_FINAL.pdf"',
      "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
      "Pragma": "no-cache",
      "Expires": "0",
    },
  });
}
