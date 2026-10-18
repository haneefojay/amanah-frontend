/**
 * next/image optimises local raster images. SVGs (the example receipts) and files on another
 * origin (backend storage) are served as they are.
 */
export function skipOptimisation(src: string): boolean {
  return !src.startsWith("/") || src.endsWith(".svg");
}
