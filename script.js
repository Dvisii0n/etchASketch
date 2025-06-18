
let defaultSize = 32;
let defaultColor = "#e8e7e3"
let previousColor = defaultColor;
let gridState = true;

function createGrid(size) {
    let board = document.querySelector(".board");
    board.setAttribute('draggable', false);
    
    //check if mouse is down or up
    let mouseDown = false;
    board.addEventListener("mousedown", (e) => {
        mouseDown = true;
    })
    board.addEventListener("mouseup", (e) => {
        mouseDown = false;
    })

    clear();

    board.style.gridTemplateColumns = `repeat(${size} , 1fr)`;
    board.style.gridTemplateRows = `repeat(${size} , 1fr)`;

    let amount = size * size;

    //create squares each one with the function of paintSquare, which only works if the mouse is down
    for (let i = 0; i < amount; i++) {
        let square = document.createElement("div");
        square.setAttribute('draggable', false);
        square.addEventListener('mouseover',(e) => {
            paintSquare(square, mouseDown);
        } )
        square.classList.add("square");
        if (gridState) {
            square.classList.add("grid-on");
        }
        board.insertAdjacentElement("beforeend", square);;
    }
    
}

function paintSquare(square, mouseDown) {
    if (mouseDown) {
        square.style.backgroundColor = defaultColor;
    }

}

function changeSize() {
    defaultSize = parseInt(prompt("Enter custom size: ", `${defaultSize}`));
    createGrid(defaultSize);
    
}

function changeColor() {
    defaultColor = prompt("Enter a color name or hex value: ", defaultColor);
}

function clear() {
    let squares = document.querySelectorAll(".square");
    squares.forEach(square => square.remove());
    
}

function choosePencil() {
    defaultColor = previousColor;
}

function erase() {
    if (defaultColor !== "#212120") {
        previousColor = defaultColor;

    }
    defaultColor = "#212120";
}

function toggleGrid() {
   
    let squares = document.querySelectorAll(".square");
    squares.forEach(square => square.classList.toggle('grid-on'));  
    
    //if grid is on turn it's state off and viceversa
    gridState = gridState ? false : true;
    
}


const buttonsDiv = document.querySelector(".buttons");

//handles all events
buttonsDiv.addEventListener("click", (e) => {
    switch (e.target.className) {
        case "change-size":
            changeSize();
            break;
        case "change-color":
            changeColor();
            break;
        case "clear":
            clear();
            createGrid(defaultSize);
            break;
        case "pencil":
            choosePencil();
            break;
        case "erase":
            erase();
            break;
        case "toggle-grid":
            toggleGrid();
            break;
        default:
            break;
    }
})


createGrid(defaultSize);



