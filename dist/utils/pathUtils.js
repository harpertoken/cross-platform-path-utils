import * as path from 'path';
import * as fs from 'fs/promises';
import { fileURLToPath } from 'url';
/**
 * Creates a platform-agnostic path from path segments
 * @param segments Path segments to join
 * @returns Normalized path using the correct path separators for the current platform
 */
export function createPath(...segments) {
    if (segments.length === 0)
        return '';
    let result = segments[0];
    for (let i = 1; i < segments.length; i++) {
        const segment = segments[i];
        // If the current segment is an absolute path, replace the result
        if (path.isAbsolute(segment) || segment.startsWith('/') || segment.startsWith('\\')) {
            result = segment;
        }
        else {
            // Otherwise, use path.join for safe concatenation
            result = path.join(result, segment);
        }
    }
    return path.normalize(result);
}
/**
 * Resolves a path relative to the current file's directory
 * @param metaUrl Should be `import.meta.url` when called from an ESM module
 * @param segments Path segments to resolve
 * @returns Absolute path resolved from the current file's directory
 */
export function resolveFromFile(metaUrl, ...segments) {
    const __filename = fileURLToPath(metaUrl);
    const __dirname = path.dirname(__filename);
    return createPath(__dirname, ...segments);
}
/**
 * Checks if a path is within a directory
 * @param filePath The file path to check
 * @param directory The directory to check against
 * @returns true if the file path is within the directory
 */
export function isPathInDirectory(filePath, directory) {
    const relative = path.relative(directory, filePath);
    return !relative.startsWith('..') && !path.isAbsolute(relative);
}
/**
 * Safely reads a file with proper error handling
 * @param filePath Path to the file to read
 * @returns File contents as string
 * @throws If the file cannot be read or is outside allowed directories
 */
export async function safeReadFile(filePath, allowedDirectories = []) {
    const normalizedPath = path.normalize(filePath);
    // Security check: ensure the path is within allowed directories
    if (allowedDirectories.length > 0) {
        const isAllowed = allowedDirectories.some(dir => isPathInDirectory(normalizedPath, dir));
        if (!isAllowed) {
            throw new Error(`Access to ${normalizedPath} is not allowed`);
        }
    }
    try {
        return await fs.readFile(normalizedPath, 'utf-8');
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(`Failed to read file ${normalizedPath}: ${error.message}`);
        }
        throw new Error(`Failed to read file ${normalizedPath}`);
    }
}
export default {
    createPath,
    resolveFromFile,
    isPathInDirectory,
    safeReadFile,
    // Re-export path methods for convenience
    ...path
};
//# sourceMappingURL=pathUtils.js.map