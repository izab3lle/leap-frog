import CellState from "./CellState.js";
import Player from "./Player.js";
import Winner from "./Winner.js";
import BoardType from "./BoardType.js";
import Cell from "./Cell.js";

export default class LeapFrog {
    constructor(rows = 6, cols = 6, boardType) {
        this.rows = rows;
        this.cols = cols;
        this.board = this.boardInit(rows, cols);
        this.playerScore = { PLAYER1: 0, PLAYER2: 0 };
        this.turn = Player.PLAYER1;
        this.winner = Winner.NONE;
        this.boardType = boardType
    }

    getScores() {
        return this.playerScore;
    }

    getTurn() {
        return this.turn;
    }

    boardInit(rows, cols) {
        let getRandomPiece = () => {
            let pieces = [CellState.PLAYER1, CellState.PLAYER2]

            let num = parseInt(Math.random() * 2);
            
            return pieces[num];
        }

        let getRandomEmpty = (board) => {
            let hasEmpty = false;

            do {
                let i = parseInt(Math.random() * board.length);
                let j = parseInt(Math.random() * board[0].length);

                console.log(`${i}, ${j}`);

                let horizontalBounds = (i - 2 >= 0 || i + 2 < board.length);
                let verticalBounds = (j - 2 >= 0 || j + 2 < board[0].length);

                let cells = {
                    horizontal: [board[i - 1, j], board[i - 2, j],
                                 board[i + 1, j], board[i + 2, j]],
                    vertical: [board[i, j - 1], board[i, j - 2],
                               board[i, j + 1], board[i, j + 2]],
                };

                if (horizontalBounds) {
                    if (cells.horizontal[0] != cells.horizontal[1] ||
                        cells.horizontal[2] != cells.horizontal[3]) {
                        board[i][j] = CellState.EMPTY;
                        hasEmpty = true;
                    }
                } if (verticalBounds) {
                    if (cells.vertical[0] != cells.vertical[1] ||
                        cells.vertical[2] != cells.vertical[3]) {
                        board[i][j] = CellState.EMPTY;
                        hasEmpty = true;
                    }
                }
            } while (!hasEmpty);

        }

        let newBoard = new Array(rows).fill(0).map((r) => new Array(cols).fill(CellState.EMPTY));
        let player1Frogs, player2Frogs = (rows * cols) / 2;
        player1Frogs = player2Frogs;
        
        newBoard.map((row, i) => row.map((cell, j) => {
            let piece = getRandomPiece();
            
            if(piece == CellState.PLAYER1 && player1Frogs > 0) {
                player1Frogs--;
                newBoard[i][j] = piece;
            } else if (player2Frogs > 0) {
                player2Frogs--;
                newBoard[i][j] = CellState.PLAYER2;
            } else {
                newBoard[i][j] = CellState.PLAYER1;
            }
        }));

        getRandomEmpty(newBoard);

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
        
        console.log(`${this.turn} jogou no [${x}, ${y}]`);
        
        this.turn = (this.turn == Player.PLAYER1) ? Player.PLAYER2 : Player.PLAYER1;
    }
}