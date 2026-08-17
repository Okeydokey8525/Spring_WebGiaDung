import type { NextConfig } from 'next';

const apiOrigin = (
  process.env.HOMESTORE_API_ORIGIN ?? 'http://localhost:18080'
).replace(/\/+$/, '');

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: `${apiOrigin}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
