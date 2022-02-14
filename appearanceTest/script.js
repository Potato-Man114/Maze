container = document.querySelector("#container");

const height = 75;
const width = 75;

class Cell {
    constructor(x, y, top, bottom, left, right) {
        this.x = x;
        this.y = y;
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right
        //this.beenTo = false;
    }
}

class Position { 
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    up() { 
        if (this.y > 0) {
            this.y--;
        }    
    }
    down() {
        if (this.y < 9) {
            this.y++;
        }
    }
    left(){
        if (this.x > 0) {
            this.x--;
        }
    }

    right() {
        if (this.x < 9) {
            this.x++;
        }
    }
    
}

let startPos = new Position(0, 5);
let endPos = new Position(9, 6);
let pos = new Position(0, 5);

const currentCellColor = "green";
const visitedCellColor = "red";
const unvisitedCellColor = "grey";
const startColor = "blue";
const endColor = "orange";
let firstMove = true;

function start() {
    rows = 10;
    cols = 10;
    data = getData();
    spans = generate(rows, cols, data);
    showStart(spans);
    showEnd(spans);
    document.addEventListener('keydown', (e) => {
        if (firstMove) {
            clearStart();
            firstMove = false;
        }
        onKeyDown(spans, e);
    });
}

function showStart(spans) {
    context = spans[startPos.y][startPos.x].firstChild.getContext("2d");
    context.fillStyle = startColor;
    context.fillRect(
        Math.floor(width / 4),
        Math.floor(height / 4),
        Math.floor(width / 2),
        Math.floor(height / 2)
    );
}

function showEnd(spans) {
    context = spans[endPos.y][endPos.x].firstChild.getContext("2d");
    context.fillStyle = endColor;
    context.fillRect(
        Math.floor(width / 4),
        Math.floor(height / 4),
        Math.floor(width / 2),
        Math.floor(height / 2)
    );
}

function clearStart() {
    context = spans[startPos.y][startPos.x].firstChild.getContext("2d");
    context.clearRect(0, 0, width, height);
    console.log("start cleared");
}

function generate(rows, cols, data) {
    spans = [];
    console.log(data);
    for (let row of data) {
        spansSub = [];
        currentRow = document.createElement("div");
        currentRow.setAttribute("class", "row");
        for (let cell of row) {
            currentCellSpan = document.createElement("span");
            currentCellSpan.setAttribute("class", "cell");
            currentCellSpan.setAttribute("height", `${height}`);
            currentCellSpan.setAttribute("width", `${width}`);
            currentCellSpan.setAttribute("data-x", cell.x);
            currentCellSpan.setAttribute("data-y", cell.y);
            currentCellSpan.setAttribute("data-top", cell.top);
            currentCellSpan.setAttribute("data-bottom", cell.bottom);
            currentCellSpan.setAttribute("data-left", cell.left);
            currentCellSpan.setAttribute("data-right", cell.right);
            //currentCellSpan.setAttribute("data-been-to", cell.beenTo);


            currentCellCanvas = document.createElement("canvas");
            currentCellCanvas.setAttribute("class", "cell__canvas");
            currentCellCanvas.setAttribute("height", `${height}`);
            currentCellCanvas.setAttribute("width", `${width}`);

            currentCellSpan.appendChild(currentCellCanvas);
            currentRow.appendChild(currentCellSpan);

            spansSub.push(currentCellSpan);
            context = currentCellCanvas.getContext("2d");
            context.strokeStyle = "grey";
            context.lineWidth = 4;
            if (cell.top) {
                context.moveTo(0, 0);
                context.lineTo(width, 0);
                context.stroke();
            }
            if (cell.bottom) {
                context.moveTo(0, height);
                context.lineTo(width, height);
                context.stroke();
            }
            if (cell.left) {
                context.moveTo(0, 0);
                context.lineTo(0, height);
                context.stroke();
            }
            if (cell.right) {
                context.moveTo(width, 0);
                context.lineTo(width, height);
                context.stroke();
            }
            
        }
        spans.push(spansSub);
        container.appendChild(currentRow);
    }
    console.log(spans);
    return spans;
}

function onKeyDown(spans, e) {
    console.log(e);
    console.log("pos: " + pos.x + ", " + pos.y);
    if (e.key == "w") {
        if (pos.y != 0) {
            span = spans[pos.y][pos.x]
            console.log(span);
            if ((span.dataset.top === 'false')) {
                //span.dataset.beenTo = "true"; 
                canvas = span.firstChild;
                context = canvas.getContext("2d");
                context.strokeStyle = visitedCellColor;
                context.lineWidth = 5;
                context.moveTo(Math.floor(width / 2), Math.floor(height / 2));
                context.lineTo(Math.floor(width / 2), 0);
                context.stroke();
                pos.up();
                span = spans[pos.y][pos.x]
                canvas = span.firstChild;
                context = canvas.getContext("2d");
                context.strokeStyle = currentCellColor;
                context.lineWidth = 5;
                context.moveTo(Math.floor(width / 2), height);
                context.lineTo(Math.floor(width / 2), Math.floor(height / 2));
                context.stroke();
                //span.dataset.beenTo = "true";
            }
            else {
                console.log("invalid move: upper wall");
            }
        }
        else {
            console.log("invalid move: upper border");
        }
        
    }
    else if (e.key == "s") {
        if (pos.y != 9) {
            span = spans[pos.y][pos.x]                
            if ((span.dataset.bottom === 'false')) {
                //span.dataset.beenTo = "true";
                canvas = span.firstChild;
                context = canvas.getContext("2d");
                context.strokeStyle = visitedCellColor;
                context.lineWidth = 5;
                context.moveTo(Math.floor(width / 2), Math.floor(height / 2));
                context.lineTo(Math.floor(width / 2), height);
                context.stroke();
                pos.down();
                span = spans[pos.y][pos.x]
                canvas = span.firstChild;
                context = canvas.getContext("2d");
                context.strokeStyle = currentCellColor;
                context.lineWidth = 5;
                context.moveTo(Math.floor(width / 2), 0);
                context.lineTo(Math.floor(width / 2), Math.floor(height / 2));
                context.stroke();
                //span.dataset.beenTo="true";
            }
            
            else {
                console.log("invalid move: bottom wall");
            }
        }
        else {
            console.log("invalid move: bottom border");
        }
           
    }
    else if (e.key == "a") {
        if (pos.x != 0) {
            span = spans[pos.y][pos.x]
            console.log(span);
            
            if ((span.dataset.left === 'false')) {
                //span.dataset.beenTo = "true";
                canvas = span.firstChild;
                context = canvas.getContext("2d");
                context.strokeStyle = visitedCellColor;
                context.lineWidth = 5;
                context.moveTo(Math.floor(width / 2), Math.floor(height / 2));
                context.lineTo(0, Math.floor(height / 2));
                context.stroke();
                pos.left();
                span = spans[pos.y][pos.x]
                canvas = span.firstChild;
                context = canvas.getContext("2d");
                context.strokeStyle = currentCellColor;
                context.lineWidth = 5;
                context.moveTo(width, Math.floor(height / 2));
                context.lineTo(Math.floor(width / 2), Math.floor(height / 2));
                context.stroke();
                //span.dataset.beenTo = "true";
            }
            else {
                console.log("invalid move: left wall");
            }
        }
        else {
            console.log("invalid move: left border");
        }    
    }
    else if (e.key == "d") {
        if (pos.x != 9) {
            span = spans[pos.y][pos.x]
            console.log(span);
            if ((span.dataset.right === 'false')) {
                //span.dataset.beenTo = "true";
                canvas = span.firstChild;
                context = canvas.getContext("2d");
                context.strokeStyle = visitedCellColor;
                context.lineWidth = 5;
                context.moveTo(Math.floor(width / 2), Math.floor(height / 2));
                context.lineTo(width, Math.floor(height / 2));
                context.stroke();
                pos.right();
                span = spans[pos.y][pos.x]
                canvas = span.firstChild;
                context = canvas.getContext("2d");
                context.strokeStyle = currentCellColor;
                context.lineWidth = 5;
                context.moveTo(0, Math.floor(height / 2));
                context.lineTo(Math.floor(width / 2), Math.floor(height / 2));
                context.stroke();
                //span.dataset.beenTo = "true";
            }
            else {
                console.log("invalid move: right wall");
            }
        }
        else {
            console.log("invalid move: right border");
        }
    }
    if (pos.x == endPos.x && pos.y == endPos.y) {
        endFound();
    }
    
}

function resetCell(span) {
    //span.dataset.beenTo = "false";
    canvas = span.firstChild;
    context = canvas.getContext("2d");
    context.strokeStyle = "grey";
    context.clearRect(0, 0, width, height);
    context.beginPath();
    context.lineWidth = 4;
    if (span.dataset.top === "true") {
        context.moveTo(0, 0);
        context.lineTo(width, 0);
        context.stroke();
    }
    if (span.dataset.bottom === "true") {
        context.moveTo(0, height);
        context.lineTo(width, height);
        context.stroke();
    }
    if (span.dataset.left === "true") {
        context.moveTo(0, 0);
        context.lineTo(0, height);
        context.stroke();
    }
    if (span.dataset.right === "true") {
        context.moveTo(width, 0);
        context.lineTo(width, height);
        context.stroke();
    }
}

function endFound() {
    console.log("Congrats");
}

function getData() {
    //top, bottom, left, right
    data = [
        [
            new Cell(0, 0, true, false, true, false),  
            new Cell(1, 0, true, true, false, true),
            new Cell(2, 0, true, false, true, false),
            new Cell(3, 0, true, false, false, true),
            new Cell(4, 0, true, false, true, false),
            new Cell(5, 0, true, true, false, false),
            new Cell(6, 0, true, true, false, true),
            new Cell(7, 0, true, false, true, false),
            new Cell(8, 0, true, true, false, false),
            new Cell(9, 0, true, true, false, true),
        ], 
        [
            new Cell(0, 1, false, false, true, true),
            new Cell(1, 1, true, false, true, false),
            new Cell(2, 1, false, true, false, true),
            new Cell(3, 1, false, false, true, true),
            new Cell(4, 1, false, false, true, true),
            new Cell(5, 1, true, true, true, false),
            new Cell(6, 1, true, false, false, false),
            new Cell(7, 1, false, true, false, false),
            new Cell(8, 1, true, true, false, false),
            new Cell(9, 1, true, false, false, true)
        ], 
        [
            new Cell(0, 2, false, false, true, true),
            new Cell(1, 2, false, false, true, true),
            new Cell(2, 2, true, true, true, false),
            new Cell(3, 2, false, true, false, false),
            new Cell(4, 2,false, true, false, false),
            new Cell(5, 2, true, true, false, false),
            new Cell(6, 2, false, true, false, true),
            new Cell(7, 2, true, false, true, true),
            new Cell(8, 2, true, true, true, false),
            new Cell(9, 2, false, false, false, true)
        ], 
        [
            new Cell(0, 3, false, false, true, true),
            new Cell(1, 3, false, true, true, false),
            new Cell(2, 3, true, true, false, false),
            new Cell(3, 3, true, false, false, true),
            new Cell(4, 3, true, false, true, false),
            new Cell(5, 3, true, true, false, false),
            new Cell(6, 3, true, true, false, false),
            new Cell(7, 3, false, true, false, true),
            new Cell(8, 3, true, false, true, false),
            new Cell(9, 3, false, false, false, true)
        ],
        [
            new Cell(0, 4, false, true, true, false),
            new Cell(1, 4, true, true, false, false),
            new Cell(2, 4, true, false, false, true),
            new Cell(3, 4, false, false, true, false),
            new Cell(4, 4, false, true, false, true),
            new Cell(5, 4, true, false, true, false),
            new Cell(6, 4, true, true, false, false),
            new Cell(7, 4, true, false, false, true),
            new Cell(8, 4, false, false, true, true),
            new Cell(9, 4, false, false, true, true)
        ], 
        [
            new Cell(0, 5, true, false, false, false),
            new Cell(1, 5, true, true, false, false),
            new Cell(2, 5, false, true, false, true),
            new Cell(3, 5, false, false, true, true),
            new Cell(4, 5, true, true, true, false),
            new Cell(5, 5, false, false, false, false),
            new Cell(6, 5, true, true, false, true),
            new Cell(7, 5, false, false, true, true),
            new Cell(8, 5, false, false, true, true),
            new Cell(9, 5, false, true, true, true)
        ],
        [
            new Cell(0, 6, false, false, true, false),
            new Cell(1, 6, true, true, false, false),
            new Cell(2, 6, true, false, false, true),
            new Cell(3, 6, false, true, true, false),
            new Cell(4, 6, true, true, false, false),
            new Cell(5, 6, false, true, false, true),
            new Cell(6, 6, true, false, true, true),
            new Cell(7, 6, false, false, true, true),
            new Cell(8, 6, false, false, true, true),
            new Cell(9, 6, true, false, true, false)
        ],
        [
            new Cell(0, 7, false, false, true, false),
            new Cell(1, 7, true, true, false, true),
            new Cell(2, 7, false, false, true, false),
            new Cell(3, 7, true, false, false, true),
            new Cell(4, 7,true, false, true, true),
            new Cell(5, 7, true, false, true, false),
            new Cell(6, 7, false, true, false, false),
            new Cell(7, 7, false, true, false, true),
            new Cell(8, 7, false, true, true, false),
            new Cell(9, 7, false, true, false, true),
        ], 
        [
            new Cell(0, 8, false, true, true, true),
            new Cell(1, 8, true, false, true, false),
            new Cell(2, 8, false, true, false, true),
            new Cell(3, 8, false, true, true, false),
            new Cell(4, 8,false, true, false, true),
            new Cell(5, 8, false, false, true, false),
            new Cell(6, 8, true, true, false, false),
            new Cell(7, 8, true, true, false, false),
            new Cell(8, 8, true, false, false, false),
            new Cell(9, 8, true, false, false, true)
        ],
        [
            new Cell(0, 9, true, true, true, false),
            new Cell(1, 9, false, true, false, false),
            new Cell(2, 9, true, true, false, false),
            new Cell(3, 9, true, true, false, false),
            new Cell(4, 9, true, true, false, false),
            new Cell(5, 9, false, true, false, false),
            new Cell(6, 9, true, true, false, false),
            new Cell(7, 9, true, true, false, false),
            new Cell(8, 9, false, true, false, true),
            new Cell(9, 9, false, true, true, true)
        ]
    ];

    return data;
}

start();
