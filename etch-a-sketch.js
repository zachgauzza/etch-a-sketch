const canvas = document.querySelector(`#etch-a-sketch`);
const ctx = canvas.getContext(`2d`);
const shakeButton = document.querySelector(`.shake`);
const MOVE_AMOUNT = 10;


// Setup canvas for drawing
const { width, height } = canvas;
ctx.lineJoin = `round`;
ctx.lineCap = `round`;
ctx.lineWidth = MOVE_AMOUNT;

// Create random starting points
let x = Math.floor(Math.random() * width);
let y = Math.floor(Math.random() * height);

let hue = 0;
ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
ctx.beginPath(); // Start the drawing
ctx.moveTo(x, y);
ctx.lineTo(x, y);
ctx.stroke();

//Drawing function
function draw({ key }) {
    hue += 5;
    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    ctx.beginPath();
    ctx.moveTo(x, y);
    switch (key) {
        case `ArrowUp`:
            y -= MOVE_AMOUNT;
            break;
        case `ArrowRight`:
            x += MOVE_AMOUNT;
            break;
        case `ArrowDown`:
            y += MOVE_AMOUNT;
            break;
        case `ArrowLeft`:
            x -= MOVE_AMOUNT;
            break;
    }
    ctx.lineTo(x, y);
    ctx.stroke();
}


// Handler for keys
function handleKey(e) {
    if(e.key.includes(`Arrow`)){
    e.preventDefault();
    draw({ key: e.key });
  }
}


// Shake/clear function
function clearCanvas(){
    canvas.classList.add(`shake`);
    ctx.clearRect(0, 0, width, height);
    canvas.addEventListener(`animationend`, function()
    {
        canvas.classList.remove(`shake`);
    }, { once: true}
    );
}

// Listen for keys
window.addEventListener(`keydown`, handleKey);
shakeButton.addEventListener(`click`, clearCanvas);