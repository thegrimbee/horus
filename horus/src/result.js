window.addEventListener('message', function(event) {
    // event.data contains the result
    var result = event.data;
    // Get the paragraph element
    var resultParagraph = document.getElementById('resultParagraph');
    // Set the text of the paragraph to the result
    result = result.replace(/\n/g, '<br>');
    resultParagraph.innerHTML = result
});