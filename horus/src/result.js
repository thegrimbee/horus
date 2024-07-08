const dangerButton = document.getElementById('dangerButton');
const warningButton = document.getElementById('warningButton');
const normalButton = document.getElementById('normalButton');
const summarizedButton = document.getElementById('summarizedButton');
const resultParagraph = document.getElementById('resultParagraph');
let summarized = false;

async function updateResult(type) {
    resultParagraph.style.display = 'block';
    resultParagraph.innerHTML = window.scanResult[type];
}

dangerButton.addEventListener("click", function(event) {
    if (summarized) {
        updateResult('danger_summarized');
    } 
    else {
        updateResult('danger');
    }    
    dangerButton.classList.add('active');
    warningButton.classList.remove('active');
    normalButton.classList.remove('active');
    }
);
warningButton.addEventListener("click", function(event) {
    if (summarized) {
        updateResult('warning_summarized');
    } 
    else {
        updateResult('warning');
    } 
    dangerButton.classList.remove('active');
    warningButton.classList.add('active');
    normalButton.classList.remove('active');
    }
);
normalButton.addEventListener("click", function(event) {
    if (summarized) {
        updateResult('normal_summarized');
    } 
    else {
        updateResult('normal');
    } 
    dangerButton.classList.remove('active');
    warningButton.classList.remove('active');
    normalButton.classList.add('active');
    }
);

summarizedButton.addEventListener("click", function(event) {
    summarized = !summarized;
    if (summarized) {
        summarizedButton.classList.add('active');
        if (dangerButton.classList.contains('active')) {
            updateResult('danger_summarized');
        }
        else if (warningButton.classList.contains('active')) {
            updateResult('warning_summarized');
        }
        else if (normalButton.classList.contains('active')) {
            updateResult('normal_summarized');
        }
        else {
            resultParagraph.style.display = 'none';
        }
    } 
    else {
        summarizedButton.classList.remove('active');
        if (dangerButton.classList.contains('active')) {
            updateResult('danger');
        }
        else if (warningButton.classList.contains('active')) {
            updateResult('warning');
        }
        else if (normalButton.classList.contains('active')) {
            updateResult('normal');
        }
        else {
            resultParagraph.style.display = 'none';
        }
    }

})

