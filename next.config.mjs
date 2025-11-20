/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  trailingSlash: true,
  reactStrictMode: true,
  // Remove the eslint section as it's deprecated
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;