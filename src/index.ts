export * from "./utils/pathUtils";

export { processFileWithImports } from "./examples/pathHandling";
export type { ProcessedFile } from "./types";

// Re-export types for backward compatibility
export type { ProcessedFile as ProcessedFileType } from "./types";
