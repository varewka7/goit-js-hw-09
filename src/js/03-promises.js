import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
}

refs.form.addEventListener('submit', onSubmitForm)

function onSubmitForm(event) {
  event.preventDefault();

  let delay = Number(event.target.elements.delay.value); // Отримуємо значення полів форми
  const step = Number(event.target.elements.step.value);
  const amount = Number(event.target.elements.amount.value);

  for (let i = 1; i <= amount; i += 1){
    createPromise(i, delay)
  .then(({ delay }) => {
    Notiflix.Notify.success(`✅ Fulfilled promise ${i} in ${delay}ms`);
  })
  .catch(({ delay }) => {
    Notiflix.Notify.failure(`❌ Rejected promise ${i} in ${delay}ms`);
  });
    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

     if (shouldResolve) {
    resolve ({position, delay})
  } else {
    reject ({position, delay})
  }
  }, delay)
})
}
