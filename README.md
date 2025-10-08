# cross-platform-path-utils

<!-- Test CI -->

Reliable path handling for Node.js, consistent across platforms.

## Install

```bash
npm install @harpertoken/cross-platform-path-utils
```

## Usage

```typescript
import {
  createPath,
  safeReadFile,
} from "@harpertoken/cross-platform-path-utils";

const path = createPath("dir", "file.txt");
const data = await safeReadFile(path, ["/allowed"]);
```

## API

- `createPath(...parts): string` - Joins path segments safely
- `safeReadFile(path, allowedDirs): Promise<string>` - Reads files within allowed directories
- `isPathInDirectory(path, dir): boolean` - Checks if path is within directory
- `resolveFromFile(fromFile, toPath): string` - Resolves relative paths

## Development

Clone, install dependencies with `npm install`, test with `npm test`, build with `npm run build`.

Use path utilities over string concatenation, normalize paths, validate inputs, handle line endings, and test cross-platform.

## Conventional Commits

Enforces standards for commit messages.

### Setup

```bash
cp scripts/commit-msg .git/hooks/commit-msg
chmod +x .git/hooks/commit-msg
```

### Rules

Start with type (`feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`, `revert`) followed by `: ` and description. Lowercase, ≤60 characters.

Example: `feat: add path utility`

### History Cleanup

Use `scripts/rewrite_msg.sh` with `git filter-branch --msg-filter './scripts/rewrite_msg.sh' HEAD`.

## License

MIT
