import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // permite build estático (quando possível)
  // se quiser, configure distDir: ".next"
};

export default nextConfig;
