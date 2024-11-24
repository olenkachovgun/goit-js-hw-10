import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorImage from '../img/error.svg';

const datetime = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('.btn');
btnStart.disabled = true;
btnStart.addEventListener('click', handleStart);

let userSelectedDate = ''; //вибрана дата
let dateCurrently = ''; //поточна дата
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  dateFormat: 'Y-m-d H:i',
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0]; //вибрана дата користувачем
    dateCurrently = Date.now(); //ms

    //валідація дати:
    if (dateCurrently > userSelectedDate.getTime()) {
      btnStart.disabled = true;
      iziToast.show({
        title: '',
        iconUrl: `${errorImage}`,
        message: 'Please choose a date in the future',
        messageColor: 'white',
        messageSize: '16px',
        backgroundColor: 'red',
        position: 'topRight',
      });
    } else {
      btnStart.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

function handleStart() {
  btnStart.disabled = true;
  const values = document.querySelectorAll('.value');
  // let deltaTime;
  const intervarId = setInterval(() => {
    datetime.disabled = true;
    dateCurrently = Date.now();
    const deltaTime = userSelectedDate.getTime() - dateCurrently;
    const deltaTimeConvert = convertMs(deltaTime);
    if (deltaTime > 0) {
      //відмальовуємо вибраний час на сторінці:
      const valueDate = [...values];
      valueDate[0].textContent = String(deltaTimeConvert.days).padStart(2, '0');
      valueDate[1].textContent = String(deltaTimeConvert.hours).padStart(
        2,
        '0'
      );
      valueDate[2].textContent = String(deltaTimeConvert.minutes).padStart(
        2,
        '0'
      );
      valueDate[3].textContent = String(deltaTimeConvert.seconds).padStart(
        2,
        '0'
      );
    } else {
      clearInterval(intervarId);
      datetime.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
