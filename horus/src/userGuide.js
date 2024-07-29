var galleryModal = new bootstrap.Modal(document.getElementById('userGuidePopup'), {
  keyboard: true
});
// Event listener for when the modal is shown
document.getElementById('userGuidePopup').addEventListener('shown.bs.modal', () => {
  window.userGuideOpen = true;
});

// Event listener for when the modal is hidden
document.getElementById('userGuidePopup').addEventListener('hidden.bs.modal', () => {
  window.userGuideOpen = false;
});
window.electron.on('open-user-guide', () => {
  if (!window.userGuideOpen){
    window.userGuideOpen = true;
    galleryModal.show();
  } else {
    galleryModal.hide();
    window.userGuideOpen = false;
  }
});
