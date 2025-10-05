let counter = 0;
let speed = 1;
let intervalId = null;

const counterElement = document.getElementById('counter');
const speedElement = document.getElementById('speed');
const bodyElement = document.body;

document.getElementById('btnMinus').addEventListener('click', function() {
    if (speed > 1) speed--;
    speedElement.textContent = speed;
    bodyElement.style.backgroundColor = 'lightcoral';
    counterElement.style.color = 'lightgreen';
});

document.getElementById('btnPlus').addEventListener('click', function() {
    if (speed < 10) speed++;
    speedElement.textContent = speed;
    bodyElement.style.backgroundColor = 'lightgreen';
    counterElement.style.color = 'lightcoral';
});

document.getElementById('btnReset').addEventListener('click', function() {
    counter = 0;
    speed = 1;
    speedElement.textContent = speed;
    updateDisplay();
    bodyElement.style.backgroundColor = 'grey';
    counterElement.style.color = 'black';
});

intervalId = setInterval(() => {
    counter += speed;
    updateDisplay();
}, 1000);

function updateDisplay() {
    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;
    counterElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}