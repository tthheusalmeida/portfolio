function showNotification(params) {
  const {
    text,
    success,
  } = params;

  let borderRight = 'var(--size-nano) solid var(--success)';

  if (!success) {
    borderRight = 'var(--size-nano) solid var(--form-error)';
  }
  
  this.Toastify({
    text,
    duration: 4000,
    close: true,
    gravity: 'bottom',
    position: 'right',
    stopOnFocus: true,
    style: {
      background: 'var(--white)',
      color: 'var(--dark-blue)',
      borderRight,
    },
  }).showToast();
}