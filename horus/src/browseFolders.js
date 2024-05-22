/**
 * Script for browseFolders button in index.html to browse the folders in the computer to select folder to scan
 */

// Get the button element
const browseFoldersButton = document.getElementById('browseFoldersButton');

async function browseFolders() {
    // Allows browseFolder.js to use dialog.showOpenDialog
    const folderPath = await window.dialogAPI.showOpenDialog();
    if (folderPath && folderPath.length > 0) {
        folderNameInput.value = folderPath[0];
    }
}

// Add click listener to the button
browseFoldersButton.addEventListener('click', browseFolders);