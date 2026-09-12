import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["tsx", "ts", "jsx", "js"],
  outputFileTracingRoot: __dirname,
  serverExternalPackages: ["framer-motion"],
};

export default nextConfig;