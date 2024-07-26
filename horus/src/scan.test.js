const fs = require('fs');
// Mock the document object and the scanButton element
beforeAll(() => {
    global.window = Object.create(window);
    Object.defineProperty(global.window, 'dialogAPI', {
        value: {
            fs: {
                // Mock other methods if needed
                statSync: jest.fn((path) => fs.statSync(path).isDirectory()),
                readDir: jest.fn(),
                readFile: jest.fn(),
                writeFile: jest.fn(),
            },
            showOpenDialog: jest.fn(),
        },
        writable: true
    });
});

// Commented code for binarySearch tests
// test('binarySearch finds the file in the array', () => {
//     const binarySearch = require('./scan');
//     const arr = ['file1.txt', 'file2.txt', 'file3.txt'];
//     expect(binarySearch(arr, 'file2.txt')).toBe(true);
// });




test('isFolder returns true for a valid folder path', async () => {
    const isFolder = require('./scan');
    const path = './test/test-dir1/folder1';
    const result = await isFolder(path);
    expect(result).toBe(true);
});

test('isFolder returns true for a valid folder path', async () => {
    const isFolder = require('./scan');
    const path = './test/test-dir1/folder2';
    const result = await isFolder(path);
    expect(result).toBe(true);
});

test('isFolder returns false for a file path', async () => {
    const isFolder = require('./scan');
    const path = './test/test-dir1/file1.txt';
    const result = await isFolder(path);
    expect(result).toBe(false);
});

test('isFolder returns false for a file path', async () => {
    const isFolder = require('./scan');
    const path = './test/test-dir1/file2.doc';
    const result = await isFolder(path);
    expect(result).toBe(false);
});

test('isFolder returns false for an invalid folder path', async () => {
    const isFolder = require('./scan');
    const path = './test/test-dir1/file1.txt';
    const result = await isFolder(path);
    expect(result).toBe(false);
});