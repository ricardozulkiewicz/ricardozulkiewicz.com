import { buildSimplePdf, type PdfLine, type PdfLink } from "../pdf-builder";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const lines: PdfLine[] = [
  { text: "Ricardo Zulkiewicz CV | PT-BR", x: 56, y: 748, size: 18, font: "bold" },
  { text: "Account Executive | Vendas B2B, Outbound & CRM | Tecnologia & IT Outsourcing", x: 56, y: 728, size: 9.5 },
  { text: "WhatsApp: +55 11 99288-1425 | E-mail: ricardomachado.zulk@gmail.com", x: 56, y: 712, size: 8 },
  { text: "Site: ricardozulkiewicz.com | LinkedIn: linkedin.com/in/rick-zulk", x: 56, y: 699, size: 8 },

  { text: "RESUMO EXECUTIVO", x: 56, y: 672, size: 11, font: "bold" },
  { text: "Account Executive com experiencia em vendas consultivas B2B, outbound, CRM e estruturacao comercial para tecnologia, startups e IT Outsourcing.", x: 56, y: 656, size: 8.7 },
  { text: "Atuacao full-cycle em prospeccao, discovery, qualificacao, proposta, negociacao e fechamento, com tickets de R$35k a R$120k.", x: 56, y: 643, size: 8.7 },
  { text: "Media aproximada de 5 deals/mes e pipeline majoritariamente outbound. Perfil combina execucao comercial, ICP, decisores e processos.", x: 56, y: 630, size: 8.7 },

  { text: "INDICADORES", x: 56, y: 604, size: 11, font: "bold" },
  { text: "5 deals/mes - media aproximada de fechamentos na Talentu", x: 56, y: 588, size: 8.8 },
  { text: "R$35k - R$120k - faixa de ticket comercial", x: 56, y: 575, size: 8.8 },
  { text: "80% outbound - origem aproximada do pipeline", x: 56, y: 562, size: 8.8 },
  { text: "~R$320k/mes - media aproximada de TCV na Talentu", x: 56, y: 549, size: 8.8 },

  { text: "EXPERIENCIA PROFISSIONAL", x: 56, y: 523, size: 11, font: "bold" },
  { text: "Account Executive | First Decision | 2026 - atual", x: 56, y: 507, size: 9.3, font: "bold" },
  { text: "Vendas B2B para tecnologia e IT Outsourcing, com foco em outbound, new business, CRM, pipeline e mercado privado.", x: 56, y: 493, size: 8.5 },
  { text: "Construcao da abordagem comercial: ICP, segmentos prioritarios, cadencias, criterios de qualificacao e materiais de apoio.", x: 56, y: 480, size: 8.5 },
  { text: "Organizacao de governanca em Pipedrive: etapas de pipeline, historico, atividades, follow-ups e gestao de oportunidades.", x: 56, y: 467, size: 8.5 },
  { text: "Criacao de materiais e guias de CRM para apoiar adocao, previsibilidade comercial e alinhamento do time.", x: 56, y: 454, size: 8.5 },

  { text: "Account Executive | Talentu | 2023 - 2025", x: 56, y: 432, size: 9.3, font: "bold" },
  { text: "Conducao end-to-end de vendas consultivas B2B para startups, scale-ups e empresas em transformacao digital.", x: 56, y: 418, size: 8.5 },
  { text: "Atuacao com C-level, RH e founders em reunioes estrategicas, diagnostico, proposta, negociacao e fechamento.", x: 56, y: 405, size: 8.5 },
  { text: "Pipeline com cerca de 80% outbound, ciclo medio de 30-45 dias, tickets R$35k a R$120k e media de 5 deals/mes.", x: 56, y: 392, size: 8.5 },
  { text: "Geracao media aproximada de R$320k/mes em TCV, com variacao entre R$180k e R$500k.", x: 56, y: 379, size: 8.5 },

  { text: "Business Development Representative | Talentu | 2022 - 2023", x: 56, y: 357, size: 9.3, font: "bold" },
  { text: "Prospeccao, qualificacao, mapeamento de mercado e geracao de conversas qualificadas para o time comercial.", x: 56, y: 343, size: 8.5 },
  { text: "Apoio na definicao de ICP, pesquisa de mercado, cadencias outbound e passagem de oportunidades qualificadas.", x: 56, y: 330, size: 8.5 },

  { text: "PROJETOS SELECIONADOS", x: 56, y: 304, size: 11, font: "bold" },
  { text: "Estruturacao de pipeline e governanca de Pipedrive para operacao comercial B2B, com criterios de avanco.", x: 56, y: 288, size: 8.5 },
  { text: "Criacao de materiais de Sales Enablement: playbooks, one-pagers, roteiros comerciais e guias de CRM.", x: 56, y: 275, size: 8.5 },

  { text: "COMPETENCIAS", x: 56, y: 249, size: 11, font: "bold" },
  { text: "Vendas consultivas B2B | Outbound | Discovery | Qualificacao | Negociacao | CRM | Pipeline | Forecast | Sales Enablement", x: 56, y: 233, size: 8.5 },
  { text: "FERRAMENTAS: Pipedrive CRM | LinkedIn | Google Workspace | Calendly | Slack", x: 56, y: 214, size: 8.5 },
  { text: "IDIOMAS: Portugues nativo | Ingles profissional | Espanhol basico", x: 56, y: 195, size: 8.5 },
  { text: "EXPERIENCIA ADICIONAL: Consultor Voluntario - NAPEN: consultoria estrategica para pequenos negocios.", x: 56, y: 176, size: 8.5 },

  { text: "ricardozulkiewicz.com | CV em portugues - versao final para site", x: 56, y: 42, size: 8 },
];

const links: PdfLink[] = [
  { url: "https://wa.me/5511992881425", x: 56, y: 708, width: 126, height: 14 },
  { url: "https://mail.google.com/mail/?view=cm&fs=1&to=ricardomachado.zulk%40gmail.com", x: 190, y: 708, width: 220, height: 14 },
  { url: "https://ricardozulkiewicz.com", x: 56, y: 695, width: 138, height: 14 },
  { url: "https://www.linkedin.com/in/rick-zulk/", x: 202, y: 695, width: 180, height: 14 },
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
