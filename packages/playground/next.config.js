const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  transpilePackages: ['taskml'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  webpack: (config, { isServer }) => {
    // Force resolve taskml to local dist for both local dev and Vercel
    config.resolve.alias = {
      ...config.resolve.alias,
      'taskml': path.resolve(__dirname, '../core/dist/index.mjs'),
    };
    return config;
  },
};

module.exports = nextConfig;
