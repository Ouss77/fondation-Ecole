/** @type {import('next').NextConfig} */
const nextConfig = {
  //rewrites works only in the node env
  // async rewrites() {
  //   return [
  //     {
  //       source: '/AF3M-Backend/:path*',
  //       destination: 'http://localhost/AF3M-Backend/:path*', // Local backend
  //     },
  //   ];
  // },

    reactStrictMode: true,
   output: 'export', // Enables static HTML export
    trailingSlash: true, // Ensures proper folder structure for static hosting
    images: {
        unoptimized: true, // Disable image optimization
      },
};

export default nextConfig;
