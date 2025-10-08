# cross-platform-path-utils

Simple, reliable path handling for Node.js that works the same everywhere.

## Install

```bash
npm install @harpertoken/cross-platform-path-utils
```

## Usage

```typescript
import {
  createPath,
  safeReadFile,
} from "@bniladridas/cross-platform-path-utils";

// Create paths
const path = createPath("dir", "file.txt");

// Read files safely
const data = await safeReadFile(path, ["/allowed"]);
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

## Conventional Commits

This project enforces [Conventional Commits](https://conventionalcommits.org/) standards.

### Setup

To enable the commit message hook:

```bash
cp scripts/commit-msg .git/hooks/commit-msg
chmod +x .git/hooks/commit-msg
```

### Commit Message Rules

- Start with a type: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`
- Followed by `: ` and description
- First line lowercase, ≤60 characters

Example: `feat: add new path utility function`

### Rewriting History

The `scripts/rewrite_msg.sh` script can clean up existing messages (lowercase + truncate).

Use with `git filter-branch --msg-filter './scripts/rewrite_msg.sh' HEAD` for history cleanup.

## Documentation

For detailed usage instructions and examples, see the [Documentation](./docs/usage.md).

## License

MIT
