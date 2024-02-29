const PUBLIC_KEY = 'si5J95M0u8ZHN0p0r';
const SERVICE_ID = 'service_olo6ikj';
const TEMPLATE_ID = 'template_6716kh5';

function insertEmailJS() {
  const script = document.createElement('script');

  script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js';
  script.defer = true;

  document.head.appendChild(script);

  setTimeout(() => {
    initEmailJS();
  }, 1000);
}

function initEmailJS() {
  this.emailjs.init(PUBLIC_KEY);
}

function sendEmailUsingEmailJS(params) {
  this.emailjs.send(SERVICE_ID,TEMPLATE_ID, params)
    .then(() => {
      showNotification({ text: 'Thank you for contact me! See you soon. 😀', success: true});
    }, (err) => {
      showNotification({ text: 'Try again, I think something went wrong. 😕'});
    });
}

insertEmailJS();