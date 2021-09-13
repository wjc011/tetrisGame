export class TetrisPiece {
    constructor(color, pos) {
      this.matrix = [
        [0, 0],
        [color, color],
        [color, color],
    ]
      this.pos = {x:pos, y:-1};
    }
  }