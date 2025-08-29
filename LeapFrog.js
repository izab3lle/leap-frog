import CellState from "./CellState.js";
import Player from "./Player.js";
import Winner from "./Winner.js";
import Cell from "./Cell.js";

export default class LeapFrog {
    constructor(rows = 6, cols = 6) {
        this.rows = rows;
        this.cols = cols;
        this.board = this.boardInit(rows, cols);
        this.playerScore = { PLAYER1: 0, PLAYER2: 0 };
        this.turn = Player.PLAYER1;
        this.winner = Winner.NONE;
    }

    boardInit(rows, cols) {
        let newBoard = new Array(rows).fill(0).map((r) => new Array(cols).fill(CellState.EMPTY));
        newBoard.map((row) => row[0] = Player.PLAYER1);
        newBoard.map((row) => row[cols - 1] = Player.PLAYER2);

        console.log(newBoard);
        return newBoard;
    }

    checkWin() {

    }

    reset(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.board = new Array(rows).fill(0).map(new Array(cols).fill(CellState.EMPTY));
        this.playerScore = { PLAYER1: 0, PLAYER2: 0 };
        this.winner = Winner.NONE;
    }

    play(cell) {
        let { x, y } = cell;
        
        if(this.board[x][y] != CellState.EMPTY) {
            if (this.board[x][y] == this.turn) {
                throw new Error(`${this.turn}, essa casa já está ocupada. Selecione uma vazia!`);
            }
        }
        
        console.log(x, y);
        console.log(`${this.turn} jogou no [${cell.x}, ${cell.y}]`);
        
        this.turn = (this.turn == Player.PLAYER1) ? Player.PLAYER2 : Player.PLAYER1;
    }
}