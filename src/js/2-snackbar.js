import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorImage from '../img/error.svg';
import successImage from '../img/success.png';

const form = document.querySelector('.form');
form.addEventListener('submit', createPromise);
const delay = document.querySelector('[name="delay"]');

function createPromise(event) {
  event.preventDefault();
  const delay = event.target.elements.delay.value; //значення поля інпут
  const state = event.target.elements.state.value; //значення радіокнопки

  const result = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(`Fulfilled promise in ${delay}ms`);
      } else {
        reject(`Rejected promise in ${delay}ms`);
      }
    }, delay);
  });

  result
    .then(rezult => {
      iziToast.show({
        title: '',
        iconUrl: `${successImage}`,
        message: `${rezult}`,
        messageColor: 'white',
        messageSize: '16px',
        backgroundColor: 'green',
        position: 'topRight',
        timeout: `${delay}`,
      });
    })
    .catch(error => {
      iziToast.show({
        title: '',
        iconUrl: `${errorImage}`,
        message: `${error}`,
        messageColor: 'white',
        messageSize: '16px',
        backgroundColor: 'red',
        position: 'topRight',
        timeout: `${delay}`,
      });
    })
    .finally(() => {
      setTimeout(() => {
        form.reset();
      }, delay);
    });
}
