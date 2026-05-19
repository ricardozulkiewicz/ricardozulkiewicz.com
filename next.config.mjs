/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/Ricardo_Zulkiewicz_CV_EN.pdf",
        destination: "/cv/ricardo-zulkiewicz-cv-en",
        permanent: false,
      },
      {
        source: "/CV_Ricardo_Zulkiewicz_PT.pdf",
        destination: "/cv/ricardo-zulkiewicz-cv-pt",
        permanent: false,
      },
      {
        source: "/Ricardo_Zulkiewicz_CV_PT.pdf",
        destination: "/cv/ricardo-zulkiewicz-cv-pt",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
