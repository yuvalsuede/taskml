/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['taskml'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
