const canvas = document.getElementById("character");
const ctx = canvas.getContext("2d");

let sprite = document.getElementById("sprite");
let currentStep = sprite;

const step = 5;
let rightPressed = false;
let leftPressed = false;
let distance = null;
let jump = false;

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

var x = canvas.width / 2;
var y = canvas.height / 2 - 100;

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
    ctx.drawImage(sprite, currentStep * 16, 0, 16, 16, x, y, 96, 96);
    waitForAction++;

    if (rightPressed) {
        x += step;
        if (waitForAction % 10 == 0)
            setTimeout(walkRight, 50);

    } else if (leftPressed) {
        x -= step;
        if (waitForAction % 10 == 0)
            setTimeout(walkLeft, 50);
    } else {
        if (waitForAction % 20 == 0)
            setTimeout(walkStand, 100);
    }
    if (jump == true && y > 50) {
        y -= 5;
    } else if (jump == true && y <= 50) {
        jump = false;
    } else if (jump == false && y != 125) {
        y += 5;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
setInterval(draw, 20);