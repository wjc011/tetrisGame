import React from 'react'
import {useEffect, useState} from 'react'
import {TetrisPiece} from './TetrisPiece'
import PriorityQueue, { ArrayStrategy } from 'js-priority-queue'
import { render } from '@testing-library/react'
const TetrisComponent = () => {
    const [pq, setPq] = useState(new PriorityQueue((a, b)=> {return b.y-a.y}))

    const matrixLen = 2;
    const [pieces, setPieces] = useState([new TetrisPiece({x:getRandomInt(6), y:0, bottom: false}, 1)]);
    const [itemToPush, setItemToPush] = useState()
    const [updatePiece, setUpdatePiece] = useState(true)
    const [lowValue, setLowValue] = useState(20);
    const [highCol, setHighCol] = useState(0);

    const updateArena = (mod)=>{

        for(let i =arena.length-1; mod ==0 ? i>0 : i>=0; i--){
            for(let j = arena[i].length-1; j>=0; j--){                
                if(arena[i][j] === 1){
                    if(i< arena.length-1 && arena[i+1][j] === 0){
                    arena[i+1][j] = arena[i][j];
                    arena[i][j] = 0;
                    }
                    else{
                        columns[j] = i;
                        if(i<lowValue){
                            setLowValue(i)
                            setHighCol(j);
                        }
                    }
                }
            }
        }
    }

    const updateArenaII = (mod) =>{
        setTempColumns(createColumnsII(arena[0].length))
        //console.log(tempColumns)
        for(let i =0; i<columnsII.length; i++){
            for(let j = 0; j<columnsII[i].length; j++){
                if(columnsII[i][j]+matrixLen >= columnHeights[i] || columnsII[i][j]+matrixLen > arena.length){
                    columnHeights[i] = columnsII[i][j];
                    console.log("ALSFJASLKFJASF")

                    console.log(i, columnsII[i])
                    columnsII[i] = columnsII[i].filter((val) => val !== columnsII[i][j])
                    console.log(i, columnsII[i])

                    j--; //reset increment by one
                    continue;
                }
                for(let k = 0; k<matrixLen; k++){
                arena[columnsII[i][j]+k][i] =0
                arena[columnsII[i][j]+k][i+k] =0
                arena[columnsII[i][j]][i+k] =0

                }
                columnsII[i][j]+=2;
            }
        }
        if(mod == 0){
            columnsII[getRandomInt(3)*2].push(0)
        }
       /*  if(mod == 0){
            setTempColumns(tempColumns => [[3, 2, 3],...tempColumns])
        }
        setColumnsII(tempColumns); */

       // drawMatrix(arena, {x:0, y:0});
    }

    

    const resetPiece = () =>{
        player.pos.y = -1;
        player.pos.x = arena.length
    }
    const onDelete = () =>{
        /*let max = 0;
        for(let i =0; i<arena[0].length; i++){
            max = Math.max(max, getHeight(i));
        }
*/
console.log(lowValue, arena.length)

if(lowValue < arena.length){

    arena[lowValue][highCol] = 0;
    columns[highCol]++;
    let min = arena.length
    let lowCol = 0;
    for(let i =0; i<columns.length; i++){
        if(columns[i] <min){
            min = arena.length
            lowCol =i
        }
    }
    setHighCol(lowCol);
    setLowValue(min);
    console.log(columns)

    drawMatrix(arena, {x:0, y:0})

}
else{

    for(let i = arena.length-1; i>=0; i--){
        for(let j = arena[0].length-1; j>=0; j--){
            if(arena[i][j] !== 0){
                arena[i][j] = 0;
                drawMatrix(arena, {x:0, y:0})

                return;
            }
        }
    }
}

    }
   
    const matrix = [
        [0, 0],
        [1, 1],
        [1, 1],
    ]

    const createMatrix = (w, h) =>{
        const matrix = []
        for(let i =0; i<h; i++){
            matrix.push(new Array(w).fill(0))
        }
        return matrix

    }
    const createColumns = (w, h) =>{
        const cols = []
        for(let i =0; i<w; i++){
            cols.push(h)
        }
        return cols
    }
    const createColumnsII = (w)=>{
        const cols = []
        for(let i =0; i<w; i++){
            cols.push(new Array());
        }
        return cols
    }

    const [arena, setArena] = useState(createMatrix(24, 40))
    const [columns, setColumns] = useState(createColumns(arena[0].length, arena.length))
    const [columnHeights, setColumnHeights] = useState(new Array(arena[0].length).fill(arena.length))
    const [columnsII, setColumnsII] = useState(createColumnsII(arena[0].length))
    const [tempColumns, setTempColumns] = useState(createColumnsII(arena[0].length))


    const collide = (arena, player) =>{
        const [m, o] = [player.matrix, player.pos]
        for (let y = 0; y<m.length; ++y){
            for(let x =0; x<m[y].length; ++x){
                if(m[y][x] !== 0 &&
                    (arena[y+o.y]&& arena[y+o.y][x+o.x]) !== 0){
                        return true;
                    }
            }
        }
        return false;

    }
    const merge = (arena, player) =>{
        player.matrix.forEach((row, y)=>{
            row.forEach((value, x)=>{
                if(value !== 0){
                    arena[y+player.pos.y][x+player.pos.x] = value;
                }
            })
        })

    }

    let player = {
        pos : {x:0, y:-1},
        matrix: matrix,

    }
    const drawMatrix = (matrix, offset) =>{
        const canvas = document.getElementById('tetris')
        const context = canvas.getContext('2d')
        context.fillStyle = '#000'
        context.fillRect(0, 0, canvas.height, canvas.width) 


        matrix.forEach((row, y)=>{
            row.forEach((value, x)=>{
                if(matrix[y][x] !== 0){

                    context.fillStyle = 'red';
                    context.fillRect(x+offset.x, y+offset.y, 1, 1);
                }
            })
        })
    }
    let dropCounter = 0;
    let dropInterval = 500;
    let lastTime = 0
    const update = (time=0)=>{
        //console.log(pieces.length)

        let deltaTime = time - lastTime
        lastTime = time
        dropCounter += deltaTime

        if(dropCounter > dropInterval){
            {pieces.map( piece => {
                if(piece.pos.y+2 >=arena.length || arena[piece.pos.y+2][piece.pos.x] !== 0){
                    piece.pos.bottom = true
                    setItemToPush(piece.pos)
                    return
                }
                arena[piece.pos.y][piece.pos.x] =0
                arena[piece.pos.y][piece.pos.x+1] =0

                piece.pos.y++;

                piece.matrix.forEach((row, y)=>{
                    row.forEach((value, x)=>{
                        arena[y+piece.pos.y][x+piece.pos.x] = piece.matrix[y][x]
                    })
                })

            })
            
        }
            dropCounter = 0;
        }
        const canvas = document.getElementById('tetris')
        const context = canvas.getContext('2d')
        
        context.fillStyle = '#000'
        context.fillRect(0, 0, canvas.height, canvas.width)
        drawMatrix(arena, {x:0, y:0})
        requestAnimationFrame(update);
    }


    const renderArena = () =>{
        let i = 0
        columnsII[0].push(0)
      var refresh = setInterval(()=>{
            i = i%6;
            if(i == 0){
                let random = getRandomInt(arena[0].length)
                if(arena[0][random] !== 0){
                    console.log("YOU LOST")
                    clearInterval(refresh);
                }
                //arena[0][random] = 1
            }
            updateArenaII(i)
            i++;

           for(let l = 0; l<columnsII.length; l++){
            for(let j =0; j<columnsII[l].length; j++){
                console.log(l, columnsII[l])
                for(let k = 0; k<matrixLen; k++){
                    arena[columnsII[l][j]+k][l] =1
                    arena[columnsII[l][j]+k][l+k] =1
                    arena[columnsII[l][j]][l+k] =1


                }
            }
        }
            drawMatrix(arena, {x:0, y:0})
        }, 500)

    }
    //UPDATE ONLY ONCE
 useEffect(()=>{
/* 
setInterval(() =>{
 pieces.map((piece) =>{
piece.updateArena(arena)
drawMatrix(arena, {x:0, y:0})

 })
}, 1000) */

}, [pieces]) 
useEffect(()=>{
pq.queue(itemToPush)
//console.log(itemToPush)
}, [itemToPush]) 

    useEffect(() => {
        const canvas = document.getElementById('tetris')
        const context = canvas.getContext('2d')
        context.scale(10, 10)
        context.fillStyle = '#000'
        context.fillRect(0, 0, canvas.height, canvas.width)
        renderArena()

    }, [])

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
      }

    return (
        <div>
            <canvas id = "tetris" width = {240} height = {400}></canvas>
            <button onClick = {onDelete}> delete</button>
        </div>
    )
}

export default TetrisComponent