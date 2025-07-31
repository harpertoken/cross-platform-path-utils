# Cross-Platform Path Utils

A robust utility for handling file paths consistently across different operating systems. This package is particularly useful for CLI tools and applications that need to work reliably across Windows, macOS, and Linux.

## Installation

```bash
# Using npm
npm install cross-platform-path-utils

# Using yarn
yarn add cross-platform-path-utils
```

## Features

- Cross-platform path manipulation
- Safe file operations with directory restrictions
- Import/export processing with path resolution
- TypeScript support included

## Real-World Example: Gemini CLI Integration

This package was inspired by and used in the [Google Gemini CLI](https://github.com/google-gemini/gemini-cli) project to handle file imports and path resolution. Here's how you can implement similar functionality:

```typescript
import { createPath, safeReadFile, processFileWithImports } from 'cross-platform-path-utils';

// Basic path creation
const configPath = createPath('config', 'settings.json');

// Safe file reading with directory restrictions
async function loadConfig() {
  try {
    const content = await safeReadFile(configPath, [process.cwd()]);
    return JSON.parse(content);
  } catch (error) {
    console.error('Error loading config:', error.message);
    return null;
  }
}

// Processing files with imports (similar to Gemini CLI's @import)
async function processMarkdownFile(filePath: string) {
  const result = await processFileWithImports(
    filePath,
    process.cwd(),
    [process.cwd()]  // Only allow imports from current directory
  );
  
  return result.content;
}
```

## API Reference

### `createPath(...parts: string[]): string`
Safely joins path segments.

```typescript
const path = createPath('dir', 'subdir', 'file.txt');
// On Windows: 'dir\\subdir\\file.txt'
// On Unix: 'dir/subdir/file.txt'
```

### `safeReadFile(path: string, allowedDirs: string[]): Promise<string>`
Reads a file safely with directory restrictions.

```typescript
// Only allow reading from /allowed/path
const content = await safeReadFile('config.json', ['/allowed/path']);
```

### `isPathInDirectory(path: string, dir: string): boolean`
Checks if a path is inside a directory.

```typescript
isPathInDirectory('/user/docs/file.txt', '/user/docs'); // true
isPathInDirectory('/user/docs/../secrets/file.txt', '/user/docs'); // false
```

### `resolveFromFile(fromFile: string, toPath: string): string`
Resolves a path relative to a file.

```typescript
resolveFromFile('/user/docs/index.md', './config.json');
// Returns: '/user/docs/config.json'
```

## Best Practices

1. **Always use path utilities** instead of string concatenation
2. **Validate all paths** before file operations
3. **Restrict file access** to specific directories
4. **Handle errors** appropriately
5. **Test on multiple platforms** to ensure compatibility

## License

MIT © 2025
