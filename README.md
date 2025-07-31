# cross-platform-path-utils

[![npm version](https://img.shields.io/npm/v/cross-platform-path-utils.svg)](https://www.npmjs.com/package/cross-platform-path-utils)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![npm downloads](https://img.shields.io/npm/dt/cross-platform-path-utils.svg)](https://www.npmjs.com/package/cross-platform-path-utils)

Simple, reliable path handling for Node.js that works the same everywhere.

## Install

```bash
npm install cross-platform-path-utils
```

## Usage

```typescript
import { createPath, safeReadFile } from 'cross-platform-path-utils';

// Create paths
const path = createPath('dir', 'file.txt');

// Read files safely
const data = await safeReadFile(path, ['/allowed']);
```

## API

- `createPath(...parts): string` - Safe path joining
- `safeReadFile(path, allowedDirs): Promise<string>` - Secure file reading
- `isPathInDirectory(path, dir): boolean` - Check path containment
- `resolveFromFile(fromFile, toPath): string` - Resolve relative paths

## Test

```bash
npm test
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

## Documentation

For detailed usage instructions and examples, see the [Documentation](./docs/usage.md).

## License

MIT
