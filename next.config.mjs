/** @type {import('next').NextConfig} */
const nextConfig = {
   output: 'export', // Enables static HTML export
    trailingSlash: true, // Ensures proper folder structure for static hosting
    images: {
        unoptimized: true, // Disable image optimization
      },
};

export default nextConfig;
