/** @type {import('next').NextConfig} */
const nextConfig = {
  
  reactStrictMode: true,
  output: 'export', // Enables static HTML export
  trailingSlash: true, // Ensures proper folder structure for static hosting
  images: {
    unoptimized: true, // Disable image optimization (for static export)
  },
};

export default nextConfig;
