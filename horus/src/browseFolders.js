/**
 * Script for browseFolders button in index.html to browse the folders in the computer to select folder to scan
 */

// Get the button element
const browseFoldersButton = document.getElementById('browseFoldersButton');

// Add event listener to the button
browseFoldersButton.addEventListener('click', () => {
    // Open the file dialog to browse folders
    const folderPath = dialog.showOpenDialogSync({ properties: ['openDirectory'] });

    // Check if a folder was selected
    if (folderPath && folderPath.length > 0) {
        // Display the folder name in the textbox
        const folderNameTextbox = document.getElementById('folderNameTextbox');
        folderNameTextbox.value = folderPath[0];
    }
});