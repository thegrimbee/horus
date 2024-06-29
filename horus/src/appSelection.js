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
    for (var i = 0; i < folders.length - 1; i++) {
        if (folders[i].split('\\').pop() !== folders[i].split('\\').pop()) {
            uniqueFolders.push(folders[i]);
        } else {
            uniqueFolders.push(folders[i + 1]);
            i++;
        }
    }
    console.log(uniqueFolders);
    return uniqueFolders;
}

async function appSelection() {    
    var dropdown = document.getElementById('appSelectionDropdown');
    var dropdownButton = document.getElementById('appSelectionDropdownButton');
    var programFilesPath = await window.processAPI.getEnv('programfiles');
    var programFiles86Path = await window.processAPI.getEnv('programfiles(x86)');

    const folders = await window.dialogAPI.fs.readDir(programFilesPath);
    const folders86 = await window.dialogAPI.fs.readDir(programFiles86Path);

    var allFolders = [...folders, ...folders86];
    allFolders = removeIdentical(folderSort(allFolders));
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
                dropdownButton.textContent = this.textContent;
                window.selectedAppFolder = path;
                console.log(window.selectedAppFolder);
            }
        })(folderPath);
        dropdown.appendChild(newOption);
        console.log('success')
    }
    console.log(allFolders);
    window.allFolders = allFolders;
}
appSelection();