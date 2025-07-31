import * as path from 'path';
/**
 * Creates a platform-agnostic path from path segments
 * @param segments Path segments to join
 * @returns Normalized path using the correct path separators for the current platform
 */
export declare function createPath(...segments: string[]): string;
/**
 * Resolves a path relative to the current file's directory
 * @param metaUrl Should be `import.meta.url` when called from an ESM module
 * @param segments Path segments to resolve
 * @returns Absolute path resolved from the current file's directory
 */
export declare function resolveFromFile(metaUrl: string, ...segments: string[]): string;
/**
 * Checks if a path is within a directory
 * @param filePath The file path to check
 * @param directory The directory to check against
 * @returns true if the file path is within the directory
 */
export declare function isPathInDirectory(filePath: string, directory: string): boolean;
/**
 * Safely reads a file with proper error handling
 * @param filePath Path to the file to read
 * @returns File contents as string
 * @throws If the file cannot be read or is outside allowed directories
 */
export declare function safeReadFile(filePath: string, allowedDirectories?: string[]): Promise<string>;
declare const _default: {
    normalize(path: string): string;
    join(...paths: string[]): string;
    resolve(...paths: string[]): string;
    matchesGlob(path: string, pattern: string): boolean;
    isAbsolute(path: string): boolean;
    relative(from: string, to: string): string;
    dirname(path: string): string;
    basename(path: string, suffix?: string): string;
    extname(path: string): string;
    sep: "\\" | "/";
    delimiter: ";" | ":";
    parse(path: string): path.ParsedPath;
    format(pathObject: path.FormatInputPathObject): string;
    toNamespacedPath(path: string): string;
    posix: path.PlatformPath;
    win32: path.PlatformPath;
    createPath: typeof createPath;
    resolveFromFile: typeof resolveFromFile;
    isPathInDirectory: typeof isPathInDirectory;
    safeReadFile: typeof safeReadFile;
};
export default _default;
