const refs = {
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const color = {
    intervalId: null,
    isActive: false,

    start() {
        if (this.isActive) {
            return;
        }

    // let changeColor = getRandomHexColor();
    this.isActive = true; 

        this.intervalId = setInterval(() => {
            refs.body.style.backgroundColor = getRandomHexColor();
        }, 1000);
    },

    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
    }
}



refs.startBtn.addEventListener('click', () => {
    color.start()
});

refs.stopBtn.addEventListener('click', () => {
    color.stop()
})

