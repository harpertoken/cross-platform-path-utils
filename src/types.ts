/**
 * Represents the result of processing a file with imports
 */
export interface ProcessedFile {
  /** The processed content of the file with imports resolved */
  content: string;
  
  /** List of file paths that were imported and processed */
  importedFiles: string[];
}
