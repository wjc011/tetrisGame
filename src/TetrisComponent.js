import React from 'react'
import {useEffect, useState} from 'react'
import {TetrisPiece} from './TetrisPiece'
import PriorityQueue from 'js-priority-queue'
import { render } from '@testing-library/react'
const TetrisComponent = () => {
    const [pq, setPq] = useState(new PriorityQueue((a, b)=> {return b.y-a.y}))


    const [pieces, setPieces] = useState([new TetrisPiece({x:getRandomInt(6)*2, y:0, bottom: false}, 1)]);
    const [itemToPush, setItemToPush] = useState()
    const [updatePiece, setUpdatePiece] = useState(true)

    const updateArena = ()=>{
        for(let i =arena.length-2; i>=0; i--){
            for(let j = arena[i].length-1; j>=0; j--){
                //console.log(i+1, arena.length)
                
                if(arena[i][j] === 1 && arena[i+1][j] === 0){
                    arena[i+1][j] = arena[i][j];
                    arena[i][j] = 0;
                }
            }
        }
    
    
    
    }

    const resetPiece = () =>{
        player.pos.y = -1;
        player.pos.x = getRandomInt(6)*2
    }
    const onDelete = () =>{
        console.log(pq.length)
        console.log(pieces)

       /*  for(let i = 0; i<arena.length; i++){
            for(let j = 0; j<arena.length; j++){
                if(arena[i][j] == 1){
                    arena[i][j] =0;
                    arena[i+1][j] =0;
                    arena[i][j+1] =0;
                    arena[i+1][j+1] =0;
                    return;
                }
            }
        }
        dropCounter = 0
        resetPiece() */
        

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
    const [arena, setArena] = useState(createMatrix(12, 20))

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
        /*  if(pieces.length == 0){
            return

        }  */
        if(dropCounter > dropInterval){
            {pieces.map( piece => {
                if(piece.pos.y+2 >=arena.length || arena[piece.pos.y+2][piece.pos.x] !== 0){
                    //queue.queue({x:piece.pos.x, y:piece.pos.y})
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

        setInterval(()=>{
            updateArena()
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
        context.scale(20, 20)
        context.fillStyle = '#000'
        context.fillRect(0, 0, canvas.height, canvas.width)
        //let piece = new TetrisPiece({x:getRandomInt(6)*2, y:0, bottom: false}, 1)
        setInterval(() => {
      /*   const piece = new TetrisPiece({x:getRandomInt(6)*2, y:0, bottom: false}, 1)
        setPieces((pieces) => [piece, ...pieces].filter(function(p){ 

            return !p.pos.bottom}))
 */
            arena[0][getRandomInt(12)] = 1
            drawMatrix(arena, {x:0, y:0})
           // setTimeout(()=>{    
    
            renderArena()
        //}, 500)
        }, 3000);

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