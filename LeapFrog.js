import CellState from "./CellState";
import Player from "./Player";
import Winner from "./Winner";
import Cell from "./Cell";

export default class FrogLeap {
    constructor(rows = 6, cols = 6) {
        this.rows = rows;
        this.cols = cols;
        this.board = new Array(rows).fill(0).map(new Array(cols).fill(CellState.EMPTY));
        this.playerScore = { PLAYER1: 0, PLAYER2: 0 };
        this.turn = Player.PLAYER1;
        this.winner = Winner.NONE;
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

    play() {

    }
}