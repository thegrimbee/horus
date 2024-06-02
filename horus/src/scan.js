
// Get the button element
const scanButton = document.getElementById("scanButton");
const folderNameInput = document.getElementById("folderNameInput");
const loadingBar = document.getElementById("loadingBar");
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
    "readme", "terms", "terms_and_conditions", "terms_of_service", "terms_of_use", "tos"];
    var possibleFileTypes = [".md", ".txt"];
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
    for (const file of files) {
        const filePath = path + '/' + file;
        if (await isFolder(filePath)) {
            if (isTos(file, true) || includeAll) {
                tosText += await getTos(filePath, true) + '\n';
            } else {
                tosText += await getTos(filePath) + '\n';
            }
        } else if (isTos(file, false, includeAll)) {
            const fileContent = await window.dialogAPI.fs.readFile(filePath);
            tosText += fileContent + '\n';
        }
    }
    return tosText;
}

/**
 * Function to analyse the TOS text and give the potentially harmful terms.
 * @param {string} tosText - The TOS text to analyse.
 * @returns {Promise<string>} A promise that resolves to the highlighted potentially harmful terms in the TOS text.
 */
async function analyseTos(tosText) {
    console.log('analysing TOS')
    const scriptPath = await window.spawnAPI.pathJoin('..', '..', 'python_scripts', 'analyse.py');
    const result = window.spawnAPI.spawn('python', [scriptPath, tosText]);
    return result;
}

/**
 * Function to update the loading bar
 * @param {number} intervalId - the interval id for the setInterval function
 */
function updateLoading(intervalId) {
    if (loadingBar.value < 99.5) {
        loadingBar.value += 0.5;
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

// Add a click event listener to the button
scanButton.addEventListener("click", function() {
    const folderPath = folderNameInput.value;
    startLoading();
    if (folderPath) {
        getTos(folderPath)
            .then(tosText => analyseTos(tosText))
            .then(result => {
                loadingBar.value = 100;        
                const resultArray = result.split('!--------------------!');
                // Open a new window or tab
                let resultWindow = window.open('result.html', '_blank');
                const endResult = resultArray[0] + '\n' + resultArray[1];
                console.log(endResult);
                // Pass the result to the new window
                resultWindow.addEventListener('load', function() {
                    // Pass the result to the new window
                    resultWindow.postMessage(endResult, '*');
                });
            })
            .catch(error => {
                console.error(error);
            });
    } else {
        console.error("No folder path provided");
    }
});