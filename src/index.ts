export * from "./utils/pathUtils.js";

export { processFileWithImports } from "./examples/pathHandling.js";
export type { ProcessedFile } from "./types.js";

// Re-export types for backward compatibility
export type { ProcessedFile as ProcessedFileType } from "./types.js";
