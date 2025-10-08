import * as path from "path";
import { fileURLToPath } from "url";
import { createPath, safeReadFile } from "../utils/pathUtils";
/**
 * Example: Safely process imports in a file
 * This demonstrates:
 * 1. Cross-platform path handling
 * 2. Safe file reading with directory restrictions
 * 3. Relative path resolution
 */
export async function processFileWithImports(filePath, baseDir, allowedDirs = []) {
    // Normalize and validate the base directory
    const normalizedPath = createPath(filePath);
    // Ensure the file is within allowed directories
    if (allowedDirs.length > 0) {
        const isAllowed = allowedDirs.some((dir) => normalizedPath.startsWith(createPath(dir)));
        if (!isAllowed) {
            throw new Error(`Access to ${normalizedPath} is not allowed`);
        }
    }
    // Read the file content
    let content = await safeReadFile(normalizedPath, allowedDirs);
    const importedFiles = [];
    // Process import statements (simplified example)
    const importRegex = /^\s*@import\s+['"]([^'"]+)['"]/gm;
    let match;
    while ((match = importRegex.exec(content)) !== null) {
        const importPath = match[1];
        const resolvedPath = createPath(path.dirname(normalizedPath), importPath);
        try {
            const importedContent = await safeReadFile(resolvedPath, allowedDirs);
            importedFiles.push(resolvedPath);
            // Replace the import statement with the actual content
            content = content.replace(match[0], `\n/* Imported from: ${importPath} */\n${importedContent}\n`);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.warn(`Warning: Could not import ${importPath}: ${errorMessage}`);
        }
    }
    return { content, importedFiles };
}
// Example usage
if (import.meta.url.endsWith("pathHandling.ts")) {
    // This block only runs when this file is executed directly
    (async () => {
        try {
            // Get the directory of the current file
            const currentDir = path.dirname(fileURLToPath(import.meta.url));
            // Example: Process a file with imports
            const result = await processFileWithImports("example/main.txt", currentDir, [currentDir]);
            console.log("Processed content:");
            console.log("------------------");
            console.log(result.content);
            console.log("\nImported files:", result.importedFiles);
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error("Error:", errorMessage);
            process.exit(1);
        }
    })();
}
export default processFileWithImports;
//# sourceMappingURL=pathHandling.js.map