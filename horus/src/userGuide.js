window.electron.on('open-user-guide', () => {
  var galleryModal = new bootstrap.Modal(document.getElementById('userGuidePopup'), {
    keyboard: false
  });
  galleryModal.show();
});
