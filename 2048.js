class Board {
    constructor() {
        this.score = 0;
        this.highScore = 0;
        this.rows = 4;
        this.columns = 4;
        this.grid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                let tile = document.createElement("div");
                tile.id = r.toString() + "-" + c.toString();
                let num = this.grid[r][c];
                this.updateTile(tile, num);
                document.getElementById("board").append(tile);
            }
        }
        //create 2 to begin the game
        this.setTwo();
        this.setTwo();
    }
    
    reset() {
        if(this.score > this.highScore) {
            this.highScore = this.score;
            document.getElementById("highScore").innerText = this.highScore;
        }
        this.score = 0;
        this.grid = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        this.updateBoard();
        document.getElementById("score").innerText = board.score;

        this.setTwo();
        this.setTwo();
    }

    updateTile(tile, num) {
        tile.innerText = "";
        tile.classList.value = ""; //clear the classList
        tile.classList.add("tile");
        if (num > 0) {
            tile.innerText = num.toString();
            tile.classList.add("x"+num.toString());                
        }
    }

    updateBoard() {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                let num = this.grid[r][c];
                this.updateTile(tile, num);
            }
        }
    }

    filterZero(row){
        return row.filter(num => num != 0); //create new array of all nums != 0
    }

    slide(row) {
        row = this.filterZero(row); 
        for (let i = 0; i < row.length-1; i++){
            if (row[i] == row[i+1]) {
                row[i] *= 2;
                row[i+1] = 0;
                this.score += row[i];
            }
        } 
        row = this.filterZero(row); 
        //add zeroes
        while (row.length < this.columns) {
            row.push(0);
        } 
        return row;
    }

    checkSlide(newGrid) {
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                if(newGrid[r][c] != this.grid[r][c])  return true;
            }
        }
        return false;
    }

    slideLeft() {
        let tmp = [[],[],[],[]];
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                tmp[r][c] = this.grid[r][c];
            }
        }
        for (let r = 0; r < this.rows; r++) {
            let row = [].concat(this.grid[r]);
            row = this.slide(row);
            tmp[r] = row;
        }
        if(this.checkSlide(tmp)) {
            console.log("yes");
            this.grid = tmp;
            this.updateBoard();
            this.setTwo();
            return true;
        }
        else {
            console.log("no pls");
            return false;
        }
    }

    slideRight() {
        let tmp = [[],[],[],[]];
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                tmp[r][c] = this.grid[r][c];
            }
        }
        for (let r = 0; r < this.rows; r++) {
            let row = [].concat(this.grid[r]);     
            row.reverse();            
            row = this.slide(row); 
            tmp[r] = row.reverse();
        }
        // console.log(tmp);
        // console.log(this.grid);
        if(this.checkSlide(tmp)) {
            console.log("yes");
            this.grid = tmp;
            this.updateBoard();
            this.setTwo();
            return true;
        }
        else {
            console.log("no pls");
            return false;
        }
    }

    slideUp() {
        let tmp = [[],[],[],[]];
        for (let c = 0; c < this.columns; c++) {
            let row = [this.grid[0][c], this.grid[1][c], this.grid[2][c], this.grid[3][c]];
            row = this.slide(row);
            tmp[0][c] = row[0];
            tmp[1][c] = row[1];
            tmp[2][c] = row[2];
            tmp[3][c] = row[3];
        }
        if(this.checkSlide(tmp)) {
            console.log("yes");
            this.grid = tmp;
            this.updateBoard();
            this.setTwo();
            return true;
        }
        else {
            console.log("no pls");
            return false;
        }
    }

    slideDown() {
        let tmp = [[],[],[],[]];
        for (let c = 0; c < this.columns; c++) {
            let row = [this.grid[0][c], this.grid[1][c], this.grid[2][c], this.grid[3][c]];
            row.reverse();
            row = this.slide(row);
            row.reverse();
            tmp[0][c] = row[0];
            tmp[1][c] = row[1];
            tmp[2][c] = row[2];
            tmp[3][c] = row[3];
        }
        if(this.checkSlide(tmp)) {
            console.log("yes");
            this.grid = tmp;
            this.updateBoard();
            this.setTwo();
            return true;
        }
        else {
            console.log("no pls");
            return false;
        }
    }

    setTwo() {
        if (!this.hasEmptyTile()) {
            return;
        }
        let found = false;
        while (!found) {
            //find random row and column to place a 2 in
            let r = Math.floor(Math.random() * this.rows);
            let c = Math.floor(Math.random() * this.columns);
            if (this.grid[r][c] == 0) {
                this.grid[r][c] = 2;
                let tile = document.getElementById(r.toString() + "-" + c.toString());
                tile.innerText = "2";
                tile.classList.add("x2");
                found = true;
            }
        }
    }

    hasEmptyTile() {
        let count = 0;
        for (let r = 0; r < this.rows; r++) {
            for (let c = 0; c < this.columns; c++) {
                if (this.grid[r][c] == 0) { //at least one zero in the board
                    return true;
                }
            }
        }
        return false;
    }

    checkGameOver() {
        if(this.hasEmptyTile()) return false;
        else {
            if (this.slideRight && this.slideLeft && this.slideUp && this.slideDown)
                return true;
        }
    }
}

board = new Board();
document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        board.slideLeft();
    }
    else if (e.code == "ArrowRight") {
        board.slideRight();
    }
    else if (e.code == "ArrowUp") {
        board.slideUp();
    }
    else if (e.code == "ArrowDown") {
        board.slideDown();
    }
    document.getElementById("score").innerText = board.score;
    if(board.checkGameOver()) {
        //hiện bảng game over
        console.log("gameOver");
    }
})

document.getElementById('newGame').onclick = function () { board.reset();};