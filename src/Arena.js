
export class Arena {
    constructor() {

    }
updateArena(arena){

    for(let i =0; i<arena.length; i++){
        for(let j = 0; j<arena[i].length; j++){
            if(arena[i][j+1] && arena[i][j+1] !== 0){
                arena[i][j+1] = arena[i][j];
                arena[i][j] = 0;
            }
        }
    }



}
    
  }