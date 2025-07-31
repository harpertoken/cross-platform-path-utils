# Cross-Platform Development Guide

A practical guide and utility library for writing cross-platform Node.js applications. This repository demonstrates best practices for handling file paths, file operations, and other platform-specific concerns in a way that works consistently across different operating systems.

## Features

- **Path Handling**: Safe and consistent path manipulation across platforms
- **File Operations**: Secure file reading with directory restrictions
- **Import Processing**: Example implementation for processing files with imports
- **Testing**: Comprehensive test suite for cross-platform compatibility

## Installation

```bash
npm install cross-platform-guide
```

## Usage

### Basic Path Handling

```typescript
import { createPath } from 'cross-platform-guide';

// Create platform-agnostic paths
const filePath = createPath('dir1', 'dir2', 'file.txt');
console.log(filePath); // Output varies by platform
```

### Safe File Operations

```typescript
import { safeReadFile } from 'cross-platform-guide';

// Read a file with directory restrictions
async function readConfig() {
  try {
    const content = await safeReadFile('/path/to/config.json', ['/allowed/dir']);
    return JSON.parse(content);
  } catch (error) {
    console.error('Failed to read config:', error.message);
    return null;
  }
}
```

### Processing Files with Imports

```typescript
import { processFileWithImports } from 'cross-platform-guide/examples';

async function processMyFile() {
  const result = await processFileWithImports(
    'path/to/main.txt',
    process.cwd(),
    [process.cwd()]  // Only allow imports from current directory
  );
  
  console.log('Processed content:', result.content);
  console.log('Imported files:', result.importedFiles);
}
```

## Best Practices

1. **Always use path utilities** instead of string concatenation for paths
2. **Normalize paths** before comparison or storage
3. **Validate file paths** to prevent directory traversal attacks
4. **Handle line endings** appropriately (`\n` vs `\r\n`)
5. **Test on multiple platforms** to catch platform-specific issues

## Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run tests:
   ```bash
   npm test
   ```
4. Build the project:
   ```bash
   npm run build
   ```

## License

MIT
