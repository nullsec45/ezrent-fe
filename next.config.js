/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.edgestore.dev',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
