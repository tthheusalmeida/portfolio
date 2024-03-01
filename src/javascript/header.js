function toggleModal() {
  const modal = document.getElementById('header-modal');

  const isModalOpen = modal.style.visibility === 'visible';

  if(isModalOpen) {
    modal.style.visibility = 'hidden';
    modal.style.zIndex = '-1';
  } else {
    modal.style.visibility = 'visible';
    modal.style.zIndex = '10';
  }
}