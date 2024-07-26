const fs = require('fs');
const {binarySearch, isFolder, isTos, getTos} = require('./scan');
// Mock the document object and the scanButton element
beforeAll(() => {
    document.body.innerHTML = `
        <button id="scanButton"></button>
        <button id="scanAllAnywayButton"></button>
    `;
    global.window = Object.create(window);
    Object.defineProperty(global.window, 'dialogAPI', {
        value: {
            fs: {
                // Mock other methods, the implementation is the same as in main.js
                statSync: jest.fn((path) => fs.statSync(path).isDirectory()),
                readDir: jest.fn(async (path) => {
                    try {
                      const files = await fs.promises.readdir(path);
                      return files;
                    } catch (error) {
                      console.error('Failed to read directory', error);
                      throw error;
                    }
                  }),
                readFile: jest.fn(async (path) => {
                    try {
                      const data = await fs.promises.readFile(path, 'utf8');
                      return data;
                    } catch (error) {
                      console.error('Failed to read file', error);
                      throw error;
                    }
                  }),
                writeFile: jest.fn(),
            },
            showOpenDialog: jest.fn(),
        },
        writable: true
    });
});

test('binarySearch finds the file in the array', () => {
    const arr = ['file1.txt', 'file2.txt', 'file3.txt'];
    expect(binarySearch(arr, 'file1.txt')).toBe(true);
});

test('binarySearch finds the file in the array', () => {
    const arr = ['file1.txt', 'file2.txt', 'file3.txt'];
    expect(binarySearch(arr, 'file2.txt')).toBe(true);
});

test('binarySearch finds the file in the array', () => {
    const arr = ['file1.txt', 'file2.txt', 'file3.txt'];
    expect(binarySearch(arr, 'file3.txt')).toBe(true);
});

test('binarySearch does not finds the file in the array', () => {
    const arr = ['file1.txt', 'file2.txt', 'file3.txt'];
    expect(binarySearch(arr, 'file4.txt')).toBe(false);
});

test('binarySearch does not finds the file in the empty array', () => {
    const arr = [];
    expect(binarySearch(arr, 'file4.txt')).toBe(false);
});


test('isFolder returns true for a valid folder path', async () => {
    const path = './test/test-dir1/folder1';
    const result = await isFolder(path);
    expect(result).toBe(true);
});

test('isFolder returns true for a valid folder path', async () => {
    const path = './test/test-dir1/folder2';
    const result = await isFolder(path);
    expect(result).toBe(true);
});

test('isFolder returns false for a file path', async () => {
    const path = './test/test-dir1/file1.txt';
    const result = await isFolder(path);
    expect(result).toBe(false);
});

test('isFolder returns false for a file path', async () => {
    const path = './test/test-dir1/file2.doc';
    const result = await isFolder(path);
    expect(result).toBe(false);
});

test('isFolder returns false for an invalid folder path', async () => {
    const path = './test/test-dir1/file1.txt';
    const result = await isFolder(path);
    expect(result).toBe(false);
});

test('isTos returns true for a valid tos file name', async () => {
    const name = 'license.txt';
    const result = await isTos(name);
    expect(result).toBe(true);
});

test('isTos returns true for a valid tos file name', async () => {
    const name = 'terms_of_service.rtf';
    const result = await isTos(name);
    expect(result).toBe(true);
});

test('isTos returns false for an invalid tos file name', async () => {
    const name = 'video1233.mp4';
    const result = await isTos(name);
    expect(result).toBe(false);
});

test('isTos returns false for an empty name', async () => {
    const name = '';
    const result = await isTos(name);
    expect(result).toBe(false);
});

test('getTos returns the tos text from a path with tos file', async () => {
    const path = './test/test-dir2/has-tos';
    const result = await getTos(path);
    expect(result).toBe('This is a tos');
});

test('getTos returns empty text from a path with no tos', async () => {
    const path = './test/test-dir2/no-tos';
    const result = await getTos(path);
    expect(result).toBe('');
});

test('getTos returns empty text from an empty path', async () => {
    const path = '';
    const result = await getTos(path);
    expect(result).toBe('');
});