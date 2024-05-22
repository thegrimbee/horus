// Get the button element
const scanButton = document.getElementById("scanButton");
const folderNameInput = document.getElementById("folderNameInput");

// NOTE: need to improve efficiency
function isTos(name) {
    name = name.toLowerCase();
    var possibleNames = ["license", "eula", "terms", "terms_of_service", "readme"];
    var possibleFileTypes = [".txt", ".md"];
    for (const possibleName of possibleNames) {
        for (const possibleFileType of possibleFileTypes) {
            if (name == possibleName + possibleFileType) {
                return true;
            }
        }
    }
    return false;
}

function isFolder(name) {
    return !name.includes(".");
}

// Function to get TOS text
// REMINDER to standardise Tos or tos instead of TOS when naming function and variables
// NOTE: make it recurse through subdirectories
async function getTos(path) {
    // Get the files in the directory
    const files = await window.dialogAPI.fs.readDir(path);
    // Get the possible TOS files
    console.log(typeof files);
    console.log(files);
    var tosText = "";
    for (const file of files) {
        if (isFolder(file)) {
            tosText += await getTos(path + '/' + file) + '\n';
        } else if (isTos(file)) {
            const fileContent = await window.dialogAPI.fs.readFile(path + '/' + file);
            tosText += fileContent + '\n';
        }
    }
    return tosText;
}

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