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
