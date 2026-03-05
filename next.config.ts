import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/table-prototypes",
  images: { unoptimized: true },
};

export default nextConfig;
