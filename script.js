const container = document.querySelector(".grid");
const but = document.querySelector(".gridButtonSize");
const colorInput =document.querySelector("#color")
const choice = document.querySelector("ul");
let arr = [];
let colors =[];
let square;
function makeGrid(size){
    for(let i = 0 ; i < size*size ;i++){  
        square = document.createElement("div");
        square.className = "gridSquare";
        square.id = `square${i}`
        container.appendChild(square);
        square.style.flexBasis = `${100/size}%`;
        square.style.backgroundColor = "rgba(255,255,255,0)";
        arr.push(false);
        colors.push(square.style.backgroundColor);  
    }
}
function removeGrid() {
    const grid = document.querySelectorAll(".gridSquare");
    grid.forEach(node => node.remove());
    arr = [];
    colors = [];
}

function changeOpacity(element , square , op){
    const checkRandom = document.querySelector("input");
    if(op==='-'){
        if(arr[element]){
            let currOpacity = (+colors[element].slice(-4,-1)*10-0.1*10)/10;
            if(currOpacity>=0)
            colors[element]= square.style.backgroundColor = colors[element].slice(0,-4)+currOpacity+")";
            if(currOpacity==0)
                arr[element]=false;        
        }
    }
    else{
        if(arr[element]){
            let currOpacity = (+colors[element].slice(-4,-1)*10+0.1*10)/10;
            if(currOpacity<1)
            colors[element]= square.style.backgroundColor = colors[element].slice(0,-4)+currOpacity+")";
        }
        else{
            let red , green ,blue;
            if(colorInput.disabled)
            {
                console.log(1);
                red = Math.floor(Math.random()*255);
                green = Math.floor(Math.random()*255);
                blue = Math.floor(Math.random()*255);
            }
            else
            {
                const hexColor = colorInput.value;
                red = parseInt(hexColor.slice(1, 3), 16);
                green = parseInt(hexColor.slice(3, 5), 16);
                blue = parseInt(hexColor.slice(5, 7), 16);
            }
            colors[element]= square.style.backgroundColor = `rgba(${red},${green},${blue},0.1)`;
            arr[element]=true;
        }
    }
}
container.addEventListener('mouseover' , (e)=>{
    const square = document.querySelector(`#${e.target.id}`);
    if(e.ctrlKey){
        changeOpacity(+e.target.id.slice(6),square,'-');
    }
    else{
        changeOpacity(+e.target.id.slice(6),square,'+');
    }
});


but.addEventListener('click',()=>{
    let newSize = +prompt("Enter the size of the new grid (1~100)");
    while(newSize>100 || newSize<1 || isNaN(newSize))
        newSize = +prompt("Enter the size of the new grid (1~100)");
    removeGrid();
    makeGrid(newSize);
})

choice.addEventListener('change',(e)=>{
    if(e.target.name==='color'){
        if(e.target.value==='color'){
            colorInput.disabled=false;
        }
        else if(e.target.value==='random'){
            colorInput.disabled = true;
        }
    }
})

makeGrid(16);