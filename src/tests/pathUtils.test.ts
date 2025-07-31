import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import * as path from 'path';
import { createPath, resolveFromFile, isPathInDirectory, safeReadFile } from '../utils/pathUtils';
import { fileURLToPath } from 'url';

// Helper to get the current file's directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('Path Utilities', () => {
  describe('createPath', () => {
    it('should handle empty input', () => {
      expect(createPath()).toBe('');
    });

    it('should join path segments correctly', () => {
      const result = createPath('dir1', 'dir2', 'file.txt');
      expect(result).toBe(path.normalize('dir1/dir2/file.txt'));
    });

    it('should handle absolute paths correctly', () => {
      const absolutePath = path.isAbsolute('/') ? '/absolute/path' : 'C:\\absolute\\path';
      const result = createPath('dir1', absolutePath, 'file.txt');
      expect(result).toBe(path.normalize(absolutePath + '/file.txt'));
    });
  });

  describe('resolveFromFile', () => {
    it('should resolve paths relative to the current file', () => {
      const result = resolveFromFile(import.meta.url, '..', 'test.txt');
      const expected = path.normalize(path.join(__dirname, '../test.txt'));
      expect(result).toBe(expected);
    });
  });

  describe('isPathInDirectory', () => {
    it('should detect when a path is inside a directory', () => {
      const baseDir = path.normalize('/base/dir');
      const filePath = path.normalize('/base/dir/subdir/file.txt');
      expect(isPathInDirectory(filePath, baseDir)).toBe(true);
    });

    it('should detect when a path is outside a directory', () => {
      const baseDir = path.normalize('/base/dir');
      const filePath = path.normalize('/other/dir/file.txt');
      expect(isPathInDirectory(filePath, baseDir)).toBe(false);
    });
  });

  describe('safeReadFile', () => {
    const mockFs = vi.hoisted(() => ({
      readFile: vi.fn(),
    }));

    beforeEach(() => {
      vi.mock('fs/promises', () => mockFs);
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it('should read a file within allowed directories', async () => {
      const testPath = path.normalize('/allowed/dir/file.txt');
      const testContent = 'test content';
      
      mockFs.readFile.mockResolvedValue(testContent);
      
      const content = await safeReadFile(testPath, ['/allowed']);
      expect(content).toBe(testContent);
      expect(mockFs.readFile).toHaveBeenCalledWith(testPath, 'utf-8');
    });

    it('should throw when trying to read outside allowed directories', async () => {
      const testPath = path.normalize('/not-allowed/dir/file.txt');
      
      await expect(
        safeReadFile(testPath, ['/allowed'])
      ).rejects.toThrow('Access to');
      
      expect(mockFs.readFile).not.toHaveBeenCalled();
    });
  });
});
