import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Дозволяє завантаження з будь-якого домену
      },
    ],
  },
};

export default nextConfig;
