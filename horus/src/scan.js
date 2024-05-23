// Get the button element
const scanButton = document.getElementById("scanButton");
const folderNameInput = document.getElementById("folderNameInput");

/**
 * Function to check if the given name corresponds to a Terms of Service (TOS) file or folder.
 * @param {string} name - The name to check.
 * @param {boolean} [isFolder=false] - Indicates if the name corresponds to a folder.
 * @returns {boolean} `true` if the name corresponds to a TOS file or folder, `false` otherwise.
 */
function isTos(name, isFolder = false, includeAll = false) {
    name = name.toLowerCase();
    var possibleNames = ["license", "eula", "terms", "terms_of_service", "readme", "docs", "legal", "policy", "tos",
        "terms_of_use", "license_agreement", "agreement", "privacy_policy", "terms_and_conditions"
    ];
    var possibleFileTypes = [".txt", ".md"];
    if (includeAll) {
        for (const possibleFileType of possibleFileTypes) {
            if (name.endsWith(possibleFileType)) {
                return true;
            }
        }
    }
    for (const possibleName of possibleNames) {
        if (isFolder && name == possibleName) {
            return true;
        }
        for (const possibleFileType of possibleFileTypes) {
            if (name == possibleName + possibleFileType) {
                return true;
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
    return tosText;
}

// Add a click event listener to the button
scanButton.addEventListener("click", function() {
    const folderPath = folderNameInput.value;
    if (folderPath) {
        getTos(folderPath)
            .then(tosText => analyseTos(tosText))
            .then(result => {
                console.log(result);
            })
            .catch(error => {
                console.error(error);
            });
    } else {
        console.error("No folder path provided");
    }
});