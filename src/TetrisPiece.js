
export class TetrisPiece {
    constructor(pos, color) {
      this.matrix = [
        [1, 1],
        [1, 1],
      ];
      this.pos = pos;
    }

    /* updateArena(arena){
        if(this.pos.y+2 >=arena.length || arena[this.pos.y+2][this.pos.x] !== 0){

            return false
        }
            arena[this.pos.y][this.pos.x] =0
            arena[this.pos.y][this.pos.x+1] =0

            this.pos.y++;

            this.matrix.forEach((row, y)=>{
                row.forEach((value, x)=>{
                    arena[y+this.pos.y][x+this.pos.x] = this.matrix[y][x]
                })
            })
            return true;
} */

    
  }