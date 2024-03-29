class Board {
    constructor() {
        this.score = 0;
        this.highScore = 0;
        this.rows = 4;
        this.columns = 4;
        this.isPlaying = true;
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
            tile.classList.add("x" +num.toString());                
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
        document.getElementById("score").innerText = this.score;
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

    handleSlide(direction) {
        if(direction == "left" && this.checkSlide(this.slideLeft())) {
            this.grid = this.slideLeft();
        }
        else 
            if(direction == 'right' && this.checkSlide(this.slideRight())) {
                this.grid = this.slideRight();
            }
            else 
                if(direction == 'up' && this.checkSlide(this.slideUp())) {
                    this.grid = this.slideUp();
                }
                else 
                    if(direction == 'down' && this.checkSlide(this.slideDown())) {
                        this.grid = this.slideDown();
                    }
                    else return;
        this.updateBoard();
        this.setTwo();
    }

    slideLeft() {
        let tmp = Object.assign({}, this.grid);
        for (let r = 0; r < this.rows; r++) {
            let row = [].concat(this.grid[r]);
            row = this.slide(row);
            tmp[r] = row;
        }
        return tmp;
    }

    slideRight() {
        let tmp = Object.assign({}, this.grid);
        for (let r = 0; r < this.rows; r++) {
            let row = [].concat(this.grid[r]);     
            row.reverse();            
            row = this.slide(row); 
            tmp[r] = row.reverse();
        }
        return tmp;
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
        return tmp;
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
        return tmp;
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
            if (this.checkSlide(this.slideRight()) == false && 
                this.checkSlide(this.slideLeft()) == false && 
                this.checkSlide(this.slideUp()) == false && 
                this.checkSlide(this.slideDown()) == false) {
                this.isPlaying = false;
                return true;
            }
            else return false;
        }
    }
    changeTheme() {
        if(document.body.className == "blue-theme") {
            document.body.classList.value = "";
        }
        else if(document.body.className == "") {
            document.body.classList.add("blue-theme");
        }
    }
}

let board = new Board();
document.addEventListener('keydown', (e) => {
    e.preventDefault();
})
document.addEventListener('keyup', (e) => {
    if (e.code == "ArrowLeft") {
        board.handleSlide("left");
    }
    if (e.code == "ArrowRight") {
        board.handleSlide("right");
    }
    if (e.code == "ArrowUp") {
        board.handleSlide("up");
    }
    if (e.code == "ArrowDown") {
        board.handleSlide("down");
    }
    
    if(board.checkGameOver()) {
        //hiện bảng game over
        document.getElementById('gameOver').style.display = "block";
        console.log("gameOver");
    }
})

document.getElementById('newGame').onclick = function () { 
    document.getElementById('gameOver').style.display = "none";
    board.reset();
};
document.getElementById('tryAgain').onclick = function () { 
    document.getElementById('gameOver').style.display = "none";
    board.reset();
};
document.getElementById('changeTheme').onclick = function () { 
    board.changeTheme();
};