var dropdown = document.getElementById('appSelectionDropdown');
var dropdownButton = document.getElementById('appSelectionDropdownButton');
var programFilesPath = await window.processAPI.getEnv('programfiles');
var programFiles86Path = await window.processAPI.getEnv('programfiles(x86)');

const folders = await window.dialogAPI.fs.readDir(programFilesPath);
const folders86 = await window.dialogAPI.fs.readDir(programFiles86Path);

const allFolders = [...folders, ...folders86];

for (var i = 0; i < allFolders.length; i++) {
    var folderPath;
    const folder = allFolders[i];
    var newOption = document.createElement("a");
    newOption.className = "dropdown-item";
    newOption.href = "#";
    newOption.textContent = allFolders[i];
    if (i < folders.length) {
        folderPath = await window.dialogAPI.fs.pathJoin(programFilesPath, folder);
    } else {
        folderPath = await window.dialogAPI.fs.pathJoin(programFiles86Path, folder);
    }
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

