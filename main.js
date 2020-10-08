const canvas = document.getElementById("character");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;


let sprite = document.getElementById("sprite");
let currentStep = sprite;

const step = 5;
const resize = 160;
const jumpHeight = 200;
let rightPressed = false;
let leftPressed = false;
let jump = false;
canvas.height = jumpHeight + resize;
let startY = canvas.height - resize
let x = canvas.width / 2;
let y = startY;

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    } else if (e.keyCode == 37) {
        leftPressed = true;
    }
    if (e.keyCode == 38) {
        jump = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    } else if (e.keyCode == 37) {
        leftPressed = false;
    }
}

const walkRight = () => {
    if (currentStep === 2) {
        currentStep = 3;
    } else {
        currentStep = 2;
    }
}

const walkLeft = () => {
    if (currentStep === 4) {
        currentStep = 5;
    } else {
        currentStep = 4;
    }
}

const walkStand = () => {
    if (currentStep === 0) {
        currentStep = 1;
    } else {
        currentStep = 0;
    }
}

let waitForAction = 0;
const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(sprite, currentStep * 16, 0, 16, 16, x, y, resize, resize);
    waitForAction++;

    if (rightPressed) {
        x += step;
        if (waitForAction % 20 == 0)
            //setTimeout(walkRight, 50);
            walkRight()

    } else if (leftPressed) {
        x -= step;
        if (waitForAction % 20 == 0)
            //setTimeout(walkLeft, 50);
            walkLeft()
    } else {
        if (waitForAction % 75 == 0)
            //setTimeout(walkStand, 100);
            walkStand()
    }

    if (jump == true && y > startY - jumpHeight) {
        y -= 5;
    } else if (jump == true && y == startY - jumpHeight) {
        jump = false;
    } else if (jump == false && y < startY) {
        y += 5;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
})
setInterval(draw, 3);