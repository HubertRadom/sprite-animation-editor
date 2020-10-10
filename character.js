const canvasCharacter = document.getElementById("character");
const ctxCharacter = canvasCharacter.getContext("2d");
canvasCharacter.width = window.innerWidth;

const charactersToChoose = document.querySelectorAll('#sky li');

let sprite = document.getElementById("sprite");
let currentStep = 0;
let currentSprite = 0;

const step = 5;
const resize = 160;
const jumpHeight = 200;
let rightPressed = false;
let leftPressed = false;
let jump = false;
canvasCharacter.height = jumpHeight + resize;
let startY = canvasCharacter.height - resize
let x = canvasCharacter.width / 2;
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

ctxCharacter.imageSmoothingEnabled = false;
let waitForAction = 0;
const draw = () => {
    ctxCharacter.clearRect(0, 0, canvasCharacter.width, canvasCharacter.height);
    ctxCharacter.drawImage(sprite, currentStep * 16, 0, 16, 16, x, y, resize, resize);
    waitForAction++;

    if (rightPressed) {
        x += step;
        if (waitForAction % 20 == 0)
            walkRight()

    } else if (leftPressed) {
        x -= step;
        if (waitForAction % 20 == 0)
            walkLeft()
    } else {
        if (waitForAction % 75 == 0)
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
    canvasCharacter.width = window.innerWidth;
})
charactersToChoose[0].addEventListener("click",()=>{
    sprite.src = 'animation1.png';
    ctxBufor.drawImage(sprite,0,0);
    //initEditor();
})
charactersToChoose[1].addEventListener("click",()=>{
    sprite.src = 'animation2.png'
    ctxBufor.drawImage(sprite,0,0);
    //initEditor();
})
charactersToChoose[2].addEventListener("click",()=>{
    sprite.src = 'animation3.png';
    ctxBufor.drawImage(sprite,0,0);
    //initEditor();
})

setInterval(draw, 3);
