document.getElementById("userGuideHyperlink").addEventListener('click', function(event) {
    event.preventDefault();
    const userGuidePopup = document.getElementById('userGuidePopup');
    const modalClose = userGuidePopup.querySelector('.modal-close');
    userGuidePopup.classList.add('is-active');
    modalClose.addEventListener('click', () => {
        userGuidePopup.classList.remove('is-active');
    });
});

