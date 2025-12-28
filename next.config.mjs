/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  // Ensure Turbopack uses this workspace as the root
  turbopack: {
    root: ".",
  },
};

export default nextConfig;
