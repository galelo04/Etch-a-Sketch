const container = document.querySelector(".container");
const but = document.querySelector(".gridSize");
let arr = [];
let colors =[];
let square;
function makeGrid(size){
    for(let i = 0 ; i < size ;i++){
        for(let j = 0 ; j < size ;j++){
            square = document.createElement("div");
            square.className = "gridSquare";
            square.id = `square${i*size+j}`
            container.appendChild(square);
            square.style.flexBasis = `${800/size}px`;
            arr.push(false);
            colors.push("");
        }
    }
}
container.addEventListener('mouseover' , (e)=>{
    const square = document.querySelector(`#${e.target.id}`);
    if(e.ctrlKey){
        if(arr[+e.target.id.slice(6)]){
            console.log("2");
            let currOpacity = (+colors[+e.target.id.slice(6)].slice(-4,-1)*10-0.1*10)/10;
            if(currOpacity>=0)
            colors[+e.target.id.slice(6)]= square.style.backgroundColor = colors[+e.target.id.slice(6)].slice(0,-4)+currOpacity+")";
            if(currOpacity==0)
                arr[+e.target.id.slice(6)]=false;        
        }
    }
    else{
        if(arr[+e.target.id.slice(6)]){
            let currOpacity = (+colors[+e.target.id.slice(6)].slice(-4,-1)*10+0.1*10)/10;
            if(currOpacity<1)
            colors[+e.target.id.slice(6)]= square.style.backgroundColor = colors[+e.target.id.slice(6)].slice(0,-4)+currOpacity+")";
        }
        else{
            const redRandom = Math.floor(Math.random()*255);
            const greenRandom = Math.floor(Math.random()*255);
            const blueRandom = Math.floor(Math.random()*255);
            colors[+e.target.id.slice(6)]= square.style.backgroundColor = `rgba(${redRandom},${greenRandom},${blueRandom},0.1)`;
            arr[+e.target.id.slice(6)]=true;
        }
    }

});

function removeGrid() {
    const grid = document.querySelectorAll(".gridSquare");
    grid.forEach(node => node.remove());
}


but.addEventListener('click',()=>{
    let newSize = +prompt("Enter the size of the new grid (1~100)");
    
    while(newSize>100 || newSize<1 || isNaN(newSize))
        newSize = +prompt("Enter the size of the new grid (1~100)");
    removeGrid();
    makeGrid(newSize);
})

makeGrid(16);