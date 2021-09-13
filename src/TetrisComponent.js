import React from 'react'
import {useEffect, useState} from 'react'
import { TetrisPiece } from './TetrisPiece'

const TetrisComponent = () => {
   // const [canvas, setCanvas] = useState();
    //const [context, setContext] = useState();
    
    const resetPiece = () =>{
        player.pos.y = -1;
        player.pos.x = getRandomInt(6)*2
    }
    const onDelete = () =>{
        for(let i = 0; i<arena.length; i++){
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
        resetPiece()
        

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
    const arena = createMatrix(12, 20)

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
        
        /* context.fillStyle = '#000'
        context.fillRect(0, 0, canvas.height, canvas.width) */
        matrix.forEach((row, y)=>{
            row.forEach((value, x)=>{
                if(value !== 0){
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
        
        let deltaTime = time - lastTime
        lastTime = time
        console.log(deltaTime)
        dropCounter += deltaTime
        if(dropCounter > dropInterval){
            player.pos.y++;
            if(collide(arena, player)){
                player.pos.y--;
                merge(arena, player)
                return
            }
            dropCounter = 0;
        }
        const canvas = document.getElementById('tetris')
        const context = canvas.getContext('2d')
        
        context.fillStyle = '#000'
        context.fillRect(0, 0, canvas.height, canvas.width)
        drawMatrix(arena, {x:0, y:0})
        drawMatrix(matrix, player.pos)
        //requestAnimationFrame(update);
        update
    }

    useEffect(() => {
        const canvas = document.getElementById('tetris')
        const context = canvas.getContext('2d')
        context.scale(20, 20)
        context.fillStyle = '#000'
        context.fillRect(0, 0, canvas.height, canvas.width)

        const piece = new TetrisPiece(1, getRandomInt(6)*2)
        update(piece);

        
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
