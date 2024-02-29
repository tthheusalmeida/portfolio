function sendEmail(event) {
  event.preventDefault();
 
  const {
    name,
    email,
    message,
    error,
  } = getSendEmailFieldsValues();

  if (error.length === 0) {
    console.log('Email sent.', { name, email, message });
    return;
  }

  error.forEach(element => {
    removeErrorField(element);

    setTimeout(() => {
      addErrorField(element);
    }, 100)
  });
}

function removeErrorField(element) {
  element.previousElementSibling.classList.remove('label-error');
  element.classList.remove('field-error');
}

function addErrorField(element) {
  element.previousElementSibling.classList.add('label-error');
  element.classList.add('field-error');
}

function getSendEmailFields() {
  const formName = document.getElementById('form-name');
  const formEmail = document.getElementById('form-email');
  const formMessage = document.getElementById('form-message');
 
  return {
    formName,
    formEmail,
    formMessage
  }
}

function getSendEmailFieldsValues() {
  const  {
    formName,
    formEmail,
    formMessage
  } = getSendEmailFields();

  let error = [];

  if (formName.value.length == 0) {
    error.push(formName);
  }
  if (formEmail.value.length == 0) {
    error.push(formEmail);
  }
  if (formMessage.value.length == 0) {
    error.push(formMessage);
  }

  return {
    name: formName.value,
    email: formEmail.value,
    message: formMessage.value,
    error: error,
  };
}
