document.addEventListener("DOMContentLoaded", function(){
  createBoard(16);
})

function createBoard(size){
  const containerGrid = document.querySelector('.container-grid');
  containerGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for(let i = 0; i < size*size; i++){
    let div = document.createElement('div');
    div.classList.add('grid-box');
    div.addEventListener("mouseenter", selectPaintColor);
    containerGrid.appendChild(div);
  }  
}  

let currPaintingMode = "black";
let currColor = "black";
let currOpacity = "1"

function selectPaintColor(){
  let opacityOfSquare = "";
  let rgb = ""

  if(this.tagName == "DIV"){
    opacityOfSquare = window.getComputedStyle(this).getPropertyValue('opacity');
    rgb = window.getComputedStyle(this).getPropertyValue('background-color');
    if(rgb === "rgba(0, 0, 0, 0)" && currPaintingMode === "shading"){
      opacityOfSquare = 0;
    }
  }
  
  if(currPaintingMode === "rainbow"){
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    currColor = "#" + randomColor;
    currOpacity = "1";
  }
  else if(currPaintingMode === "shading"){
    currColor = "black";
    if(rgb !== "rgb(0, 0, 0)") opacityOfSquare = 0;
    if(opacityOfSquare < 1) {
      opacityOfSquare = Number(opacityOfSquare);
      opacityOfSquare += 0.1;
      currOpacity = opacityOfSquare.toString();
    }
  }
  else if(currPaintingMode === "black"){
    currColor = "black";
    currOpacity = "1";
  }

  this.style.backgroundColor = currColor;
  this.style.opacity = currOpacity;
  currOpacity = "1";
}

function changePaintMode(mode){
  currPaintingMode = mode;
}

const gridSizeBtn = document.querySelector('#gridSizeSubmit');

gridSizeBtn.addEventListener('click', () => {
  let size = document.getElementById("userInputSize").value;
  changeSizeOfGrid(size);
})

function changeSizeOfGrid(size){
  const notifyUser = document.querySelector('.notifyUserInputSize');
  if(size < 1 || size > 100){
    notifyUser.innerHTML = "Please enter number between 1 and 100";
  }
  else{
    notifyUser.innerHTML = "";
    const containerGrid = document.querySelector('.container-grid');
    const pixels = containerGrid.querySelectorAll('.grid-box');
    pixels.forEach((pixel) => pixel.remove());
    createBoard(size);
  }
}