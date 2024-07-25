// Mock the document object and the scanButton element
beforeAll(() => {
    document.body.innerHTML = `
        <button id="scanButton"></button>
        <button id="scanAllAnywayButton"></button>
    `;
});

const binarySearch = require('./scan');

test('binarySearch finds the file in the array', () => {
    const arr = ['file1.txt', 'file2.txt', 'file3.txt'];
    expect(binarySearch(arr, 'file2.txt')).toBe(true);
});

test('binarySearch does not find the file in the array', () => {
    const arr = ['file1.txt', 'file2.txt', 'file3.txt'];
    expect(binarySearch(arr, 'file4.txt')).toBe(false);
});