const dangerButton = document.getElementById('dangerButton');
const warningButton = document.getElementById('warningButton');
const normalButton = document.getElementById('normalButton');
const resultParagraph = document.getElementById('resultParagraph');

async function updateResult(type) {
    resultParagraph.style.display = 'block';
    resultParagraph.innerHTML = window.scanResult[type];
}

dangerButton.addEventListener("click", function(event) {    
        updateResult('danger');
    }
);
warningButton.addEventListener("click", function(event) {
        updateResult('warning');
    }
);
normalButton.addEventListener("click", function(event) {
        updateResult('normal');
    }
);

