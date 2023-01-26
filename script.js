document.addEventListener("DOMContentLoaded", function(){
  createBoard(16);
})

function createBoard(size){
  const containerGrid = document.querySelector('.container-grid');
  containerGrid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

  for(let i = 0; i < size*size; i++){
    let div = document.createElement('div');
    div.classList.add('grid-box');
    div.addEventListener("mouseenter", colorGrid);
    containerGrid.appendChild(div);
  }  
}  

function colorGrid(){
  this.classList.add('colored')
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