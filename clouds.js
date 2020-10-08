const canvasClouds = document.getElementById("clouds");
const ctxClouds = canvasClouds.getContext("2d");
canvasClouds.width = window.innerWidth;
canvasClouds.height = 210;

let xPos1 = 0;
let xPos2 = 1200;
const cloudWidth = 350;
const cloudHeight = 50;

const paint = () => {
    ctxClouds.clearRect(0, 0, canvasClouds.width, canvasClouds.height)
    ctxClouds.fillStyle = 'white';
    ctxClouds.fillRect(xPos1, 50, cloudWidth, cloudHeight);
    //ctxClouds.fillStyle = 'blue';
    ctxClouds.fillRect(xPos1 + 50, 25, cloudWidth - 100, cloudHeight * 2);
    //ctxClouds.fillStyle = 'green';
    ctxClouds.fillRect(xPos1 + 100, 0, cloudWidth - 200, cloudHeight * 3);
    //
    ctxClouds.fillRect(xPos2, 50 + 60, cloudWidth, cloudHeight);
    ctxClouds.fillRect(xPos2 + 50, 25 + 60, cloudWidth - 100, cloudHeight * 2);
    ctxClouds.fillRect(xPos2 + 100, 0 + 60, cloudWidth - 200, cloudHeight * 3);


    xPos1++;
    xPos2++;
    if (xPos1 == canvasClouds.width) {
        xPos1 = -cloudWidth;
    }
    if (xPos2 == canvasClouds.width) {
        xPos2 = -cloudWidth;
    }
    window.requestAnimationFrame(paint);
}

paint();

window.addEventListener('resize', () => {
    canvasClouds.width = window.innerWidth;
    paint();
})