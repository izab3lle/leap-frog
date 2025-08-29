import Cell from "./Cell.js";
import LeapFrog from "./LeapFrog.js";

class GUI {
    constructor() {
        this.game = new LeapFrog();
    }

    play(ev) {
        let message = document.querySelector("#message");

        let td = ev.target;
        let cell = new Cell(td.parentNode.rowIndex, td.cellIndex);
        console.log(cell.x, cell.y);
        
        try {
            this.game.play(cell);
            message.textContent = "";
        } catch(error) {
            message.textContent = error.message;
        }
    }

    init() {
        let table = document.querySelector("#board tbody");
        
        this.game.board.map((row, i) => {
            let tr = document.createElement("tr");
            table.appendChild(tr);

            row.map((cell, j) => {
                let td = document.createElement("td");
                td.addEventListener("click", this.play.bind(this));
                if(j == 0 || j == row.length - 1) {
                    td.className = cell;
                }
                
                tr.appendChild(td);
            })
        })
    }
}

let gui = new GUI();
gui.init();