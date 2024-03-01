function toggleModal() {
  const modal = document.getElementById('header-modal');

  const isModalOpen = modal.style.visibility === 'visible';

  if(isModalOpen) {
    modal.style.visibility = 'hidden';
    modal.style.zIndex = '-1';
    modal.style.opacity = '0';
  } else {
    modal.style.visibility = 'visible';
    modal.style.zIndex = '10';
    modal.style.opacity = '1';
  }
}