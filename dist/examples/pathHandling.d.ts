import type { ProcessedFile } from "../types";
/**
 * Example: Safely process imports in a file
 * This demonstrates:
 * 1. Cross-platform path handling
 * 2. Safe file reading with directory restrictions
 * 3. Relative path resolution
 */
export declare function processFileWithImports(filePath: string, baseDir: string, allowedDirs?: string[]): Promise<ProcessedFile>;
export default processFileWithImports;
