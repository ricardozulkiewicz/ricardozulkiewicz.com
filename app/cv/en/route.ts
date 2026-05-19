const pdf = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R /F2 5 0 R >> >> /Contents 6 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>
endobj
6 0 obj
<< /Length 2587 >>
stream
BT /F2 24 Tf 56 742 Td (Ricardo Zulkiewicz) Tj ET
BT /F1 10 Tf 56 718 Td (Account Executive | B2B Sales | CRM | IT Outsourcing | Sao Paulo, Brazil) Tj ET
56 688 m 556 688 l S
BT /F2 12 Tf 56 660 Td (PROFILE) Tj ET
BT /F1 9.5 Tf 56 644 Td (- Account Executive with experience in B2B consultative sales, IT Outsourcing, outbound, CRM, Sales) Tj ET
BT /F1 9.5 Tf 56 632 Td (- Enablement, business development and commercial process structuring.) Tj ET
BT /F1 9.5 Tf 56 617 Td (- Work across prospecting, discovery, qualification, stakeholder relationships, proposals,) Tj ET
BT /F1 9.5 Tf 56 605 Td (- negotiation, closing and pipeline management.) Tj ET
BT /F2 12 Tf 56 580 Td (EXPERIENCE) Tj ET
BT /F2 10.5 Tf 56 564 Td (First Decision | Account Executive | 2026 - present) Tj ET
BT /F1 9.5 Tf 56 551 Td (B2B sales for technology and IT Outsourcing, focused on outbound, new business, CRM, pipeline,) Tj ET
BT /F1 9.5 Tf 56 539 Td (commercial structuring and enablement materials for the commercial operation.) Tj ET
BT /F2 10.5 Tf 56 524 Td (Talentu | Account Executive | 2023 - 2025) Tj ET
BT /F1 9.5 Tf 56 511 Td (Full-cycle consultative sales in the startup and digital transformation ecosystem, including) Tj ET
BT /F1 9.5 Tf 56 499 Td (diagnosis, strategic meetings, negotiation, closing and client relationships.) Tj ET
BT /F2 10.5 Tf 56 484 Td (Talentu | Business Development Representative | 2022 - 2023) Tj ET
BT /F1 9.5 Tf 56 471 Td (Prospecting, opportunity qualification, market mapping, commercial cadence and conversation) Tj ET
BT /F1 9.5 Tf 56 459 Td (generation with technology companies, startups and growing businesses.) Tj ET
BT /F2 12 Tf 56 434 Td (CORE SKILLS) Tj ET
BT /F1 9.5 Tf 56 418 Td (- B2B consultative sales, outbound, new business, discovery, qualification, negotiation and closing.) Tj ET
BT /F1 9.5 Tf 56 403 Td (- CRM, Pipedrive, pipeline governance, stage criteria, follow-up and commercial predictability.) Tj ET
BT /F1 9.5 Tf 56 388 Td (- Sales Enablement, playbooks, scripts, narratives, commercial materials and process design.) Tj ET
BT /F1 9.5 Tf 56 373 Td (- IT Outsourcing, technology, startups, SaaS, digital transformation and stakeholder relationships.) Tj ET
BT /F2 12 Tf 56 348 Td (LANGUAGES) Tj ET
BT /F1 9.5 Tf 56 332 Td (- Native Portuguese.) Tj ET
BT /F1 9.5 Tf 56 317 Td (- English for reading, professional writing, networking, research and international presence.) Tj ET
BT /F1 9.5 Tf 56 302 Td (- Basic Spanish.) Tj ET
BT /F1 8 Tf 56 38 Td (ricardozulkiewicz.com | linkedin.com/in/rick-zulk | ricardomachado.zulk@gmail.com) Tj ET
endstream
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000251 00000 n 
0000000321 00000 n 
0000000396 00000 n 
trailer
<< /Size 7 /Root 1 0 R >>
startxref
3034
%%EOF
`;

export async function GET() {
  return new Response(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=Ricardo_Zulkiewicz_CV_EN.pdf",
    },
  });
}
