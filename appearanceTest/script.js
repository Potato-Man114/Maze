container = docuemnt.querySelector("#container");

class Cell {
    constructor(x, y, top, bottom, left, right) {
        this.x = x;
        this.y = y;
        this.top = top;
        this.bottom = bottom;
        this.left = left;
        this.right = right
    }
}

function start() {
    rows = 10;
    cols = 10;
    data = getData();
    generate(rows, cols, data);
}

function getData() {
    //top, bottom, left, right
    data = [
        [
            new Cell(0, 0, true, false, true, false),  
            new Cell(0, 1, true, true, false, true),
            new Cell(0, 2, true, false, true, false),
            
            new Cell(0, 3, true, false, false, true),
            new Cell(0, 4, true, false, true, false),
            new Cell(0, 5, true, true, false, false),
            
            new Cell(0, 6, true, true, false, true),
            new Cell(0, 7, true, false, true, false),
            new Cell(0, 8, true, true, false, false),
            
            new Cell(0, 9, true, true, false, true),
        ], 
        [
            new Cell(1, 0, false, false, true, true),
            new Cell(1, 1, true, false, true, false),
            new Cell(1, 2, false, true, false, true),
            
            new Cell(1, 3, false, false, true, true),
            new Cell(1, 4, false, false, true, true),
            new Cell(1, 5, true, true, true, false),
            
            new Cell(1, 6, true, false, false, false),
            new Cell(1, 7, false, true, false, false),
            new Cell(1, 8, true, true, false, false),
            
            new Cell(1, 9, true, false, false, true)
        ], 
        [
            new Cell(2, 0, false, false, true, true),
            new Cell(2, 1, false, false, true, true),
            new Cell(2, 2, true, true, true, false),
            
            new Cell(2, 3, false, true, false, false),
            new Cell(2, 4,false, true, false, false),
            new Cell(2, 5, true, true, false, false),
            
            new Cell(2, 6, false, true, false, true),
            new Cell(2, 7, true, false, true, true),
            new Cell(2, 8, true, true, true, false),
            
            new Cell(2, 9, false, false, false, true)
        ], 
        [
            new Cell(3, 0, false, false, true, true),
            new Cell(3, 1, false, true, true, false),
            new Cell(3, 2, true, true, false, false),
            
            new Cell(3, 3, true, false, false, true),
            new Cell(3, 4, true, false, true, false),
            new Cell(3, 5, true, true, false, false),
            
            new Cell(3, 6, true, true, false, false),
            new Cell(3, 7, false, true, false, true),
            new Cell(3, 8, true, false, true, false),
            
            new Cell(3, 9, false, false, false, true)
        ], 
        [
            new Cell(4, 0, false, true, true, false),
            new Cell(4, 1, true, true, false, false),
            new Cell(4, 2, true, false, false, true),
            new Cell(4, 3, false, false, true, false),
            new Cell(4, 4, false, true, false, true),
            new Cell(4, 5, true, false, true, false),
            new Cell(4, 6, true, true, false, false),
            new Cell(4, 7, true, false, false, true),
            new Cell(4, 8, false, false, true, true),
            new Cell(4, 9, false, false, true, true)
        ], 
        [
            new Cell(5, 0, true, false, false, false),
            new Cell(5, 1, true, true, false, false),
            new Cell(5, 2, false, true, false, true),
            
            new Cell(5, 3, false, false, true, true),
            new Cell(5, 4, true, true, true, false),
            new Cell(5, 5, false, false, false, false),
            
            new Cell(5, 6, true, true, false, true),
            new Cell(5, 7, false, false, true, true),
            new Cell(5, 8, false, false, true, true),
            
            new Cell(5, 9, false, true, true, true)
        ],
        [
            new Cell(6, 0, false, false, true, false),
            new Cell(6, 1, true, true, false, false),
            new Cell(6, 2, true, false, false, true),
            
            new Cell(6, 3, false, true, true, false),
            new Cell(6, 4, true, true, false, false),
            new Cell(6, 5, false, true, false, true),
            
            new Cell(6, 6, true, false, true, true),
            new Cell(6, 7, false, false, true, true),
            new Cell(6, 8, false, false, true, true),
            
            new Cell(6, 9, true, false, true, false)
        ], 
        [
            new Cell(7, 0, false, false, true, true),
            new Cell(7, 1, true, true, false, true),
            new Cell(7, 2, false, false, true, false),
            
            new Cell(7, 3, true, false, false, true),
            new Cell(7, 4,true, false, true, true),
            new Cell(7, 5, true, false, true, false),
            
            new Cell(7, 6, false, true, false, false),
            new Cell(7, 7, false, true, false, true),
            new Cell(7, 8, false, true, true, false),
            
            new Cell(7, 9, false, true, false, true),
        ], 
        [
            new Cell(8, 0, false, true, true, true),
            new Cell(8, 1, true, false, true, false),
            new Cell(8, 2, false, true, false, true),
            
            new Cell(8, 3, false, true, true, false),
            new Cell(8, 4,false, true, false, true),
            new Cell(8, 5, false, false, true, false),
            
            new Cell(8, 6, true, true, false, false),
            new Cell(8, 7, true, true, false, false),
            new Cell(8, 8, true, false, false, false),
            
            new Cell(8, 9, true, false, false, true)
        ], 
        [
            new Cell(9, 0, true, true, true, false),
            new Cell(9, 1, false, true, false, false),
            new Cell(9, 2, true, true, false, false),
            
            new Cell(9, 3, true, true, false, false),
            new Cell(9, 4, true, true, false, false),
            new Cell(9, 5, false, true, false, false),
            
            new Cell(9, 6, true, true, false, false),
            new Cell(9, 7, true, true, false, false),
            new Cell(9, 8, false, true, false, true),
            
            new Cell(9, 9, false, true, true, true)
        ],
    ];

    return data;
}

function generate(rows, cols, data) {

}

start();
