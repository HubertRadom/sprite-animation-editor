const btnEdit = document.getElementById('btn_edit');
const btnSave = document.querySelector('.hidden_btn:nth-child(1)');
const btnClear = document.querySelector('.hidden_btn:nth-child(2)');
const btnExit = document.querySelector('.hidden_btn:nth-child(3)');
const btnReload = document.querySelector('.hidden_btn:nth-child(4)');

let color = 'rgba(0,255,0,1)';

const saveImageData = () => {
    let k =0; 
    for(let i = 0; i < 16; i++){
        for(let j = 0; j < 16; j++)
        {
            let colors = colorArray[k].slice(5,-1).split(",")
            imageData.data[i*384 + j*4] = parseInt(colors[0]);
            imageData.data[i*384 + j*4 + 1] = parseInt(colors[1]);
            imageData.data[i*384 + j*4 + 2] = parseInt(colors[2]);
            imageData.data[i*384 + j*4 + 3] = parseFloat(colors[3]*255);
            //console.log(k);
            k++;
        }
    }
}

btnEdit.addEventListener('click', () => {
    document.querySelector('#hidden').style.display = "block";
})

btnSave.addEventListener('click', ()=>{
    for(let i =0; i < colorArray.length; i++)
    {
        colorArray[i] = editedColorArray[i];
    }
    saveImageData();
    ctxBufor.putImageData(imageData,0,0);
    sprite.src=canvasBufor.toDataURL("image/png");
    console.log(canvasBufor.toDataURL("image/png"));
    console.log('save');
})

btnClear.addEventListener('click', ()=>{
    for(let i = 0; i < pixelArray.length; i++)
    {
        pixelArray[i].style.backgroundColor = `${colorArray[i]}`;
    }
})

btnExit.addEventListener('click', ()=>{
    document.querySelector('#hidden').style.display = "none";
})

btnReload.addEventListener('click', ()=>{
    ctxBufor.drawImage(sprite,0,0);
    console.log('reload');
})

const canvasBufor = document.createElement('canvas');
canvasBufor.width=96;
canvasBufor.height=16;
const ctxBufor = canvasBufor.getContext("2d");
ctxBufor.drawImage(sprite,0,0);

let imageData = ctxBufor.getImageData(0,0,canvasBufor.width,canvasBufor.height);
const pixelArray=[];
const colorArray=[];
const editedColorArray=[];

const choosePixel = document.getElementById('choose_pixel');
for(let i = 0; i < 16; i++){
for(let j = 0; j < 16; j++)
{
    const pixel = document.createElement('div');
    pixel.setAttribute('class','pixel');
    let red = imageData.data[i*384 + j*4];
    let green = imageData.data[i*384 + j*4 + 1];
    let blue = imageData.data[i*384 + j*4 + 2];
    let alpha = imageData.data[i*384 + j*4 + 3];
    colorArray.push(`rgba(${red},${green},${blue},${alpha})`)
    editedColorArray.push(`rgba(${red},${green},${blue},${alpha})`)
    pixel.style.backgroundColor=`rgba(${red},${green},${blue},${alpha})`
    choosePixel.appendChild(pixel);
    pixelArray.push(pixel);

}}

for(let i = 0; i < pixelArray.length; i++){
    pixelArray[i].addEventListener("mouseover", (x)=>{
        pixelArray[i].style.backgroundColor = color;
    })
    pixelArray[i].addEventListener("mouseout", (x)=>{
        pixelArray[i].style.backgroundColor = editedColorArray[i] ;
    })
    pixelArray[i].addEventListener("click", (x)=>{
        pixelArray[i].style.backgroundColor = color;
        editedColorArray[i] = color;
    })
}

const loadCharacter = () => {
}
