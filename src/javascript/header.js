function toggleModal() {
  const modal = document.getElementById('header-modal');
  const hambuerguerIcon = document.getElementById('hamburguer-menu-icon');

  const isModalOpen = modal.style.visibility === 'visible';
  if(isModalOpen) {
    modal.style.visibility = 'hidden';
    modal.style.zIndex = '-1';
    modal.style.opacity = '0';

    hambuerguerIcon.style.opacity = '1';
    document.body.style.overflowY = 'auto';
  } else {
    modal.style.visibility = 'visible';
    modal.style.zIndex = '10';
    modal.style.opacity = '1';

    hambuerguerIcon.style.opacity = '0';
    document.body.style.overflowY = 'hidden';
  }
}