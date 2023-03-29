import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

const input = document.querySelector('input#datetime-picker');
const startBtn = document.querySelector('button');
const d = document.querySelector('[data-days]');
const h = document.querySelector('[data-hours]');
const m = document.querySelector('[data-minutes]');
const s = document.querySelector('[data-seconds]');

let timer = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      
    } else {
      startBtn.disabled = false;
      startBtn.addEventListener('click', createClock)
      
      function createClock() { 
        input.setAttribute('disabled', true)
        startBtn.disabled = true;
        
        timer = setInterval(() => {
          const currentTime = Date.now();
          const finishTime = selectedDates[0];
          const ms = finishTime - currentTime;
          
          const { days, hours, minutes, seconds } = convertMs(ms)
          d.textContent = addLeadingZero(days);
          h.textContent = addLeadingZero(hours);
          m.textContent = addLeadingZero(minutes);
          s.textContent = addLeadingZero(seconds);
        
  if (ms < 1000) {
    clearInterval(timer);
    }
        }, 1000)
      }
    }
     
  }
}

flatpickr('input#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = (Math.floor(ms / day));
  // Remaining hours
  const hours = (Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = (Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = (Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
  
}

function addLeadingZero(value) {
   return String(value).padStart(2,0)
};
