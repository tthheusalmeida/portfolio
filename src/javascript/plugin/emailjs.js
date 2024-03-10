const encryptedData = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJQVUJMSUNfS0VZIjoic2k1Sjk1TTB1OFpITjBwMHIiLCJTRVJWSUNFX0lEIjoic2VydmljZV9vbG82aWtqIiwiVEVNUExBVEVfSUQiOiJ0ZW1wbGF0ZV82NzE2a2g1IiwiaWF0IjoxNzEwMDY5OTI1fQ.SAgMlamdM-myMBdGdSrOwHJf8gxasK_7eSc99yY8k6c';

const {
  PUBLIC_KEY,
  SERVICE_ID,
  TEMPLATE_ID,
} = window.getDataDecoded(encryptedData);

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