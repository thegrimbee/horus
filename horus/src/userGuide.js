document.getElementById("userGuideHyperlink").addEventListener('click', function(event) {
    event.preventDefault();
    var userGuideText = document.getElementById("userGuideText");
    if (userGuideText.style.display === 'none') {
        userGuideText.style.display = 'block';
    } else {
        userGuideText.style.display = 'none';
    }
});