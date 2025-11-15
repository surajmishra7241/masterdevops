/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",          // static export
  trailingSlash: true,       // so routes work nicely on GitHub Pages
  images: {
    unoptimized: true,       // important for export
  },
};

export default nextConfig;