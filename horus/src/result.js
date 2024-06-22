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
        dangerButton.classList.add('active');
        warningButton.classList.remove('active');
        normalButton.classList.remove('active');
    }
);
warningButton.addEventListener("click", function(event) {
        updateResult('warning');
        dangerButton.classList.remove('active');
        warningButton.classList.add('active');
        normalButton.classList.remove('active');
    }
);
normalButton.addEventListener("click", function(event) {
        updateResult('normal');
        dangerButton.classList.remove('active');
        warningButton.classList.remove('active');
        normalButton.classList.add('active');
    }
);