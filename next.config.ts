import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Allow unoptimized images if you are using many external local-relative paths still
    unoptimized: process.env.NODE_ENV === 'development'
  },
};

export default nextConfig;
