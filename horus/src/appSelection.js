var dropdown = document.getElementById('appSelectionDropdown');
var dropdownInput = document.getElementById('appSelectionDropdownInput');

function removeIdentical(optionList) {
    var uniqueOptions = [];
    uniqueOptions.push(optionList[0]);
    for (var i = 1; i < optionList.length; i++) {
        if (uniqueOptions[uniqueOptions.length - 1].textContent !== optionList[i].textContent) {
            uniqueOptions.push(optionList[i]);
        } else {
            if (uniqueOptions[uniqueOptions.length - 1].getAttribute('type') > optionList[i].getAttribute('type')) {
                uniqueOptions[uniqueOptions.length - 1] = optionList[i];
            }
        }
    }
    return uniqueOptions;
}

/**
 * Checks if the given path is a folder.
 * @param {string} path - The path to check.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the path is a folder, `false` otherwise.
 */
async function isFolder(path) {
    return await window.dialogAPI.fs.statSync(path);
}

async function removeNonFolders(folders, programFilesPath) {
    var foldersOnly = [];
    for (var i = 0; i < folders.length; i++) {
        if (await isFolder(programFilesPath + "/" + folders[i])) {
            foldersOnly.push(folders[i]);
        }
    }
    return foldersOnly;
}

async function getScans() {
    var scans = fetch('http://localhost:5000/scans', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(
        (response) => {
            if (response.status !== 200) {
                console.log('Error: ' + response.status);
            }
            return response.json();
            
        }
    ).then(response => response.scans).catch(function(error) {
        console.log('Getting scans error: ' + error);
    });
    return scans;
}

function optionComparator(a, b) {
    const aName = a.textContent;
    const bName = b.textContent;
    return aName.localeCompare(bName);
}

function updateDropdown(optionList, sorted=false) {
    dropdown.innerHTML = '';
    if (!sorted) {
        optionList.sort(optionComparator);
        optionList = removeIdentical(optionList);
    }
    for (var i = 0; i < optionList.length; i++) {
        dropdown.appendChild(optionList[i]);
    }
    return optionList;
}

function createScanOption(name, path) {
    console.log(name, path);
    var scanOption = document.createElement('a');
    scanOption.className = "dropdown-item";
    scanOption.href = "#";
    scanOption.textContent = name;
    var type;
    if (path == "") {
        type = 0;
    } else if (path.includes("x86")) {
        type = 2;
    } else {
        type = 1;
    }
    scanOption.setAttribute('type', type);
    scanOption.onclick = (function(path) {
        return function() {
            dropdownInput.value = this.textContent;
            window.selectedAppFolder = path;
            console.log(window.selectedAppFolder);
        }
    })(path);
    return scanOption;
}

async function appSelection() {    
    const scans = getScans();
    var programFilesPath = await window.processAPI.getEnv('programfiles');
    var programFiles86Path = await window.processAPI.getEnv('programfiles(x86)');

    var folders = await window.dialogAPI.fs.readDir(programFilesPath);
    var folders86 = await window.dialogAPI.fs.readDir(programFiles86Path);
    folders = await removeNonFolders(folders, programFilesPath);
    folders86 = await removeNonFolders(folders86, programFiles86Path);

    dropdownInput.addEventListener('focus', function() {
        dropdown.style.width = dropdownInput.offsetWidth + 'px';
    });

    dropdownInput.addEventListener('resize', function() {
        dropdown.style.width = dropdownInput.offsetWidth + 'px';
    });

    var allFolders = [...folders, ...folders86];
    var optionList = [];
    for (var i = 0; i < allFolders.length; i++) {
        const folder = allFolders[i];
        if (i < folders.length) {
            allFolders[i] = await window.dialogAPI.fs.pathJoin(programFilesPath, folder);
        } else {
            allFolders[i] = await window.dialogAPI.fs.pathJoin(programFiles86Path, folder);
        }
        const folderPath = allFolders[i];
        console.log(folder, folderPath);
        optionList.push(createScanOption(folder, folderPath));
    }
    optionList = updateDropdown(optionList);
    window.allOptions = optionList;
    scans.then(scans => {
        console.log(scans);
        var newOptionsList = [...optionList, ...scans.map(scan => createScanOption(scan, ""))];
        newOptionsList = updateDropdown(newOptionsList);
        window.allOptions = newOptionsList;
    });
    window.allFolders = allFolders;
    
}

dropdownInput.addEventListener('input', function() {
    var input = dropdownInput.value.toLowerCase();
    window.selectedAppFolder = "";
    var optionList = window.allOptions.filter(option => option.textContent.toLowerCase().startsWith(input));
    updateDropdown(optionList, true);
});

appSelection();