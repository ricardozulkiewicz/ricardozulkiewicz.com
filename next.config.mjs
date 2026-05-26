/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/cv/access/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
      {
        source: "/api/cv/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/contact",
        destination: "/#contact",
        permanent: false,
      },
      {
        source: "/contato",
        destination: "/pt#contact",
        permanent: false,
      },
      {
        source: "/about",
        destination: "/#about",
        permanent: false,
      },
      {
        source: "/sobre",
        destination: "/pt#about",
        permanent: false,
      },
      {
        source: "/portfolio",
        destination: "/#work",
        permanent: false,
      },
      {
        source: "/projetos",
        destination: "/pt#work",
        permanent: false,
      },
      {
        source: "/curriculo",
        destination: "/cv",
        permanent: false,
      },
      {
        source: "/currículo",
        destination: "/cv",
        permanent: false,
      },
      {
        source: "/resume",
        destination: "/cv",
        permanent: false,
      },
      {
        source: "/download-cv",
        destination: "/cv",
        permanent: false,
      },
      {
        source: "/baixar-curriculo",
        destination: "/cv",
        permanent: false,
      },
      {
        source: "/baixar-currículo",
        destination: "/cv",
        permanent: false,
      },
      {
        source: "/privacy",
        destination: "/privacidade",
        permanent: false,
      },
      {
        source: "/privacy-policy",
        destination: "/privacidade",
        permanent: false,
      },
      {
        source: "/politica-de-privacidade",
        destination: "/privacidade",
        permanent: false,
      },
      {
        source: "/política-de-privacidade",
        destination: "/privacidade",
        permanent: false,
      },
      {
        source: "/lgpd",
        destination: "/privacidade",
        permanent: false,
      },
      {
        source: "/terms",
        destination: "/termos",
        permanent: false,
      },
      {
        source: "/terms-of-use",
        destination: "/termos",
        permanent: false,
      },
      {
        source: "/termos-de-uso",
        destination: "/termos",
        permanent: false,
      },
      {
        source: "/Ricardo_Zulkiewicz_CV_EN.pdf",
        destination: "/cv",
        permanent: false,
      },
      {
        source: "/CV_Ricardo_Zulkiewicz_PT.pdf",
        destination: "/cv",
        permanent: false,
      },
      {
        source: "/Ricardo_Zulkiewicz_CV_PT.pdf",
        destination: "/cv",
        permanent: false,
      },
      {
        source: "/cv/pt-final",
        destination: "/cv",
        permanent: false,
      },
      {
        source: "/cv/ricardo-zulkiewicz-cv-en",
        destination: "/cv",
        permanent: false,
      },
      {
        source: "/cv/ricardo-zulkiewicz-cv-pt",
        destination: "/cv",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
