import path from 'node:path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home directory makes Turbopack infer the
  // wrong workspace root and ignore this project's lockfile. Pin it explicitly.
  turbopack: {
    root: path.resolve(import.meta.dirname),
  },
  images: {
    // Next 16 requires this: the default is [75] and ANY other `quality` prop is
    // coerced to the nearest allowed value with no warning, while a direct hit
    // on /_next/image?q=... outside the list returns 400. `Photo` requests 80,
    // so 80 has to be listed or the photographs quietly ship softer than
    // intended and nothing anywhere says so.
    qualities: [80],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 980, 1080, 1200, 1920, 2048],
    imageSizes: [256, 384, 512],
  },
};

export default nextConfig;
