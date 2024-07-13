function folderSort(folders) {
    folders.sort((a, b) => {
        const folderNameA = a.split('\\').pop();
        const folderNameB = b.split('\\').pop();
        return folderNameA.localeCompare(folderNameB);
    });
    return folders;
}

function removeIdentical(folders) {
    var uniqueFolders = [];
    console.log(folders);
    for (var i = 0; i < folders.length - 1; i++) {
        if (folders[i].split('\\').pop() !== folders[i + 1].split('\\').pop()) {
            uniqueFolders.push(folders[i]);
        } else {
            uniqueFolders.push(folders[i]);
            i++;
        }
    }
    console.log(uniqueFolders);
    return uniqueFolders;
}

/**
 * Checks if the given path is a folder.
 * @param {string} path - The path to check.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the path is a folder, `false` otherwise.
 */
async function isFolder(path) {
    return await window.dialogAPI.fs.statSync(path);
}

async function removeNonFolders(folders) {
    var foldersOnly = [];
    for (var i = 0; i < folders.length; i++) {
        if (await isFolder(folders[i])) {
            foldersOnly.push(folders[i]);
        }
    }
    return foldersOnly;
}

async function appSelection() {    
    var dropdown = document.getElementById('appSelectionDropdown');
    var dropdownInput = document.getElementById('appSelectionDropdownInput');
    var programFilesPath = await window.processAPI.getEnv('programfiles');
    var programFiles86Path = await window.processAPI.getEnv('programfiles(x86)');

    const folders = await window.dialogAPI.fs.readDir(programFilesPath);
    const folders86 = await window.dialogAPI.fs.readDir(programFiles86Path);

    dropdownInput.addEventListener('focus', function() {
        console.log('dropdownInput is in focus');
        dropdown.style.width = dropdownInput.offsetWidth + 'px';
    });

    dropdownInput.addEventListener('resize', function() {
        dropdown.style.width = dropdownInput.offsetWidth + 'px';
    });

    var allFolders = [...folders, ...folders86];
    for (var i = 0; i < allFolders.length; i++) {
        var newOption = document.createElement("a");
        const folder = allFolders[i];
        newOption.className = "dropdown-item";
        newOption.href = "#";
        newOption.textContent = allFolders[i];
        if (i < folders.length) {
            allFolders[i] = await window.dialogAPI.fs.pathJoin(programFilesPath, folder);
        } else {
            allFolders[i] = await window.dialogAPI.fs.pathJoin(programFiles86Path, folder);
        }
        const folderPath = allFolders[i];
        newOption.onclick = (function(path) {
            return function() {
                dropdownInput.value = this.textContent;
                window.selectedAppFolder = path;
                console.log(window.selectedAppFolder);
            }
        })(folderPath);
        dropdown.appendChild(newOption);
        console.log('success')
    }
    allFolders = folderSort(allFolders);
    allFolders = removeIdentical(allFolders);
    allFolders = await removeNonFolders(allFolders);
    console.log(allFolders);
    window.allFolders = allFolders;
}
appSelection();