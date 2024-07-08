//const { app } = require("electron");

// Get the button element
const scanButton = document.getElementById("scanButton");
// const folderNameInput = document.getElementById("folderNameInput");
const scanAllAnywayButton = document.getElementById("scanAllAnywayButton");
const scanAllButton = document.getElementById("scanAllButton");
const loadingBar = document.getElementById("loadingBar");
const dangerButton = document.getElementById('dangerButton');
const HIGHLIGHT_COLOR = 'rgba(34, 139, 34, 0.5)'; //'#3a3a3a' for grey;
const DEFAULT_COLOR = 'transparent';
window.selectedApp = null;
console.log("scan.js loaded");

/**
 * Performs a binary search on the array of possible names
 * @param {Array} arr - The sorted array of possible file names.
 * @param {string} file - The name of the file.
 * @returns {boolean} `true` if the file is found, `false` otherwise.
 */
function binarySearch(arr, file) {
    var start = 0, end = arr.length - 1;
    while (start <= end) {
        var mid = Math.floor((start + end) / 2);
        if (arr[mid] === file) return true;
        else if (arr[mid] < file) start = mid + 1;
        else end = mid - 1;
    }
    return false;

}

/**
 * Function to check if the given name corresponds to a Terms of Service (TOS) file or folder.
 * @param {string} name - The name to check.
 * @param {boolean} [isFolder=false] - Indicates if the name corresponds to a folder.
 * @returns {boolean} `true` if the name corresponds to a TOS file or folder, `false` otherwise.
 */
function isTos(name, isFolder = false, includeAll = false) {
    name = name.toLowerCase();
    // Keep this array sorted alphabetically
    var possibleNames = ["agreement", "docs", "eula", "legal", "license", "license_agreement", "policy", "privacy_policy", 
     "terms", "terms_and_conditions", "terms_of_service", "terms_of_use", "tos"];
    var possibleFileTypes = [".md", ".rtf", ".txt"];
    // Update the minimum and maximum length of the TOS file name accordingly
    const MIN_LENGTH = 3;
    const MAX_LENGTH = 24;
    if (includeAll) {
        for (const possibleFileType of possibleFileTypes) {
            if (name.endsWith(possibleFileType)) {
                return true;
            }
        }
    } else if (name.length < MIN_LENGTH || name.length > MAX_LENGTH) {
        return false;
    } else if (isFolder) {
        return binarySearch(possibleNames, name);
    } else {
        for (const possibleFileType of possibleFileTypes) {
            if (name.endsWith(possibleFileType)) {
                if (binarySearch(possibleNames, name.substring(0, name.length - possibleFileType.length))) {
                    return true;
                }
            }
        }
    }
    return false;
}

/**
 * Checks if the given path is a folder.
 * @param {string} path - The path to check.
 * @returns {Promise<boolean>} A promise that resolves to `true` if the path is a folder, `false` otherwise.
 */
async function isFolder(path) {
    return await window.dialogAPI.fs.statSync(path);
}

/**
 * Function to get the TOS text from the files in the folder.
 * @param {string} path - The path of the folder.
 * @param {boolean} [includeAll=false] - Indicates if all text files should be included, regardless of their name.
 * @returns {Promise<string>} A promise that resolves to the combined TOS text from all the TOS files in the folder.
 */
// REMINDER to standardise Tos or tos instead of TOS when naming function and variables
async function getTos(path, includeAll = false) {
    // Get the files in the directory
    const files = await window.dialogAPI.fs.readDir(path);
    // Get the possible TOS files
    var tosText = "";
    var tempTos;
    for (const file of files) {
        const filePath = path + '/' + file;
        if (await isFolder(filePath)) {
            if (isTos(file, true) || includeAll) {
                tempTos = (await getTos(filePath, true)).trim();
            } else {
                tempTos = (await getTos(filePath)).trim();
            }
            if (tempTos) {
                tosText += tempTos + '\n';
            }
        } else if (isTos(file, false, includeAll)) {
            const fileContent = await window.dialogAPI.fs.readFile(filePath);
            if (fileContent) tosText += fileContent + '\n';
        }
    }
    return tosText.trim();
}

/**
 * Function to analyse the TOS text and give the potentially harmful terms.
 * @param {string} tosText - The TOS text to analyse.
 * @returns {Promise<string>} A promise that resolves to the highlighted potentially harmful terms in the TOS text.
 */
async function analyseTos(tosText, appName) {
    try {
        console.log('analysing TOS of', appName);
        
        // NOTE: change these two paths when packaging the app
        const scriptPath = await window.spawnAPI.pathJoin('..', '..', 'python_scripts', 'analyse.py');
        const tosPath = await window.spawnAPI.pathJoin('..', '..',  'python_scripts', 'tos.txt');

        window.dialogAPI.fs.writeFile(tosPath, tosText);
        await window.spawnAPI.spawn('python', [scriptPath, appName]);

        const normalPath = await window.spawnAPI.pathJoin('..', '..',  'python_scripts', 'results', 'normal.txt');
        const normal = await window.dialogAPI.fs.readFile(normalPath, 'utf8');
        const warningPath = await window.spawnAPI.pathJoin('..', '..',  'python_scripts', 'results', 'warning.txt');
        const warning = await window.dialogAPI.fs.readFile(warningPath, 'utf8');
        const dangerPath = await window.spawnAPI.pathJoin('..', '..', 'python_scripts', 'results', 'danger.txt');
        const danger = await window.dialogAPI.fs.readFile(dangerPath, 'utf8');
        const summarizedNormalPath = await window.spawnAPI.pathJoin('..', '..',  'python_scripts', 'results', 'normal_summary.txt');
        const summarizedNormal = await window.dialogAPI.fs.readFile(summarizedNormalPath, 'utf8');
        const summarizedWarningPath = await window.spawnAPI.pathJoin('..', '..',  'python_scripts', 'results', 'warning_summary.txt');
        const summarizedWaring = await window.dialogAPI.fs.readFile(summarizedWarningPath, 'utf8');
        const summarizedDangerPath = await window.spawnAPI.pathJoin('..', '..',  'python_scripts', 'results', 'danger_summary.txt');
        const summarizedDanger = await window.dialogAPI.fs.readFile(summarizedDangerPath, 'utf8');
        
        return [normal, warning, danger, summarizedNormal, summarizedWaring, summarizedDanger];

    } catch (error) {
        console.error(error);
        return ["An error occurred while analysing the TOS text. Please try again later.", "An error occurred while analysing the TOS text. Please try again later.", 
            "An error occurred while analysing the TOS text. Please try again later.",
            "An error occurred while analysing the TOS text. Please try again later."];
    }
}

/**
 * Function to update the loading bar
 * @param {number} intervalId - the interval id for the setInterval function
 */
function updateLoading(intervalId) {
    if (loadingBar.value < 98) {
        loadingBar.value += 0.1;
    } else {
        clearInterval(intervalId);
    }
}

/**
 * Function to start the loading bar
 */
function startLoading() {
    loadingBar.value = 0;
    loadingBar.style.display = "block";
    var intervalId = setInterval(function() {
        updateLoading(intervalId)
    }, 20);

}

function selectApp(listItem) {
    if (window.selectedApp) {
        window.selectedApp.style.backgroundColor = DEFAULT_COLOR;
    }
    window.selectedApp = listItem;
    window.selectedApp.style.backgroundColor = HIGHLIGHT_COLOR;
}

function scan() {
    const folderPath = window.selectedAppFolder;
    console.log(folderPath);
    //I made this change to get the app name from the folder path, assuming it's always after Program Files
    const appName = folderPath.split("\\")[2];
    startLoading();
    if (folderPath) {
        getTos(folderPath)
            .then(tosText => analyseTos(tosText, appName))
            .then(result => {
                loadingBar.value = 100;
                const resultArray = result;                

                for (var i = 0; i < resultArray.length; i++) {
                    resultArray[i] = resultArray[i].replace(/\n+/g, '<br>')
                        .replace(/\\[a-zA-Z]+[0-9]*[ ]?|{\\*\\[^{}]+}|[{}]|\\'..|\\[a-z]+\n|\\[*]/g, '');
                }
                var endResult = {'danger': resultArray[2], 'warning': resultArray[1], 'normal': resultArray[0], 'normal_summarized': resultArray[3], 'warning_summarized': resultArray[4], 'danger_summarized': resultArray[5]};
                console.log(endResult);

                // Set the text of the paragraph to the result
                window.scanResult = endResult;

                // Add a list item to the scannedAppList, make sure the list items are unique
                const scannedAppList = document.getElementById("appScannedList");
                const listItem = document.createElement("li");
                listItem.id = "appListItem-" + appName;
                listItem.className = "list-group-item list-group-item-action";
                listItem.innerHTML = `<a class="app-scanned link-offset-2 link-underline link-underline-opacity-0" data-bs-toggle="list" href="#appListItem-${appName}">${appName}</a>`;
                if (!document.getElementById(listItem.id)) {
                    scannedAppList.appendChild(listItem);
                } else {
                    scannedAppList.replaceChild(listItem, document.getElementById(listItem.id));
                }
                //For now I'm relying on frame to store the result, might change later
                listItem.addEventListener("click", function(event) {
                    window.scanResult = endResult;
                    dangerButton.click();
                    selectApp(listItem);
                });

                selectApp(listItem);
                // Ensure dangerButton exists before clicking
                if (dangerButton) {
                    dangerButton.click();
                }
                // Assuming scanButton exists and is intended to reset its label to 'Scan'
                if (scanButton) {
                    scanButton.innerHTML = 'Scan';
                }
                let scanAppListLength = scannedAppList.children.length;
                if (scanAppListLength === window.allFolders.length) {
                    scanAllButton.innerHTML = 'Scan All';
                }
            })
            .catch(error => {
                console.error(error);
            });
    } else {
        console.error("No folder path provided");
    }
}

// Add a click event listener to the button
scanButton.addEventListener("click", function(event) {
    scanButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Scanning...';
    event.preventDefault();
    scan();
    
});

scanAllAnywayButton.addEventListener("click", function(event) {
    scanAllButton.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Scanning...';
    event.preventDefault();
    for (var i = 0; i < window.allFolders.length; i++) {
        window.selectedAppFolder = window.allFolders[i];
        scan();
    }
    const scannedAppList = document.getElementById("appScannedList");
    
    
});

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', (event) => {
      if (event.target.tagName === 'A' && event.target.href.startsWith('http') && !event.target.href.includes('localhost')){
        event.preventDefault(); // Prevent default action
        window.electron.openExternal(event.target.href); // Open the link in the default browser
      }
    });
  });