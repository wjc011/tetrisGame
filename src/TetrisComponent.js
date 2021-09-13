import React from 'react'
import {useEffect, useState} from 'react'

const TetrisComponent = () => {
   // const [canvas, setCanvas] = useState();
    //const [context, setContext] = useState();
    

   
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
        pos : {x:0, y:0},
        matrix: matrix,

    }
    const drawMatrix = () =>{

        const canvas = document.getElementById('tetris')
        const context = canvas.getContext('2d')
        context.fillStyle = '#000'
        context.fillRect(0, 0, canvas.height, canvas.width)
        player.matrix.forEach((row, y)=>{
            row.forEach((value, x)=>{
                if(value !== 0){
                    context.fillStyle = 'red';
                    context.fillRect(x+player.pos.x, y+player.pos.y, 1, 1);
                }
            })
        })
    }
    let dropCounter = 0;
    let dropInterval = 1000;
    let lastTime = 0
    const update = (time = 0)=>{
        
        let deltaTime = time - lastTime

        lastTime = time
        dropCounter += deltaTime
        if(dropCounter > dropInterval){
            player.pos.y++;
            if(collide(arena, player)){
                player.pos.y--;
                drawMatrix()
                merge(arena, player)
                player.pos.y = 0
            }
            dropCounter = 0;
        }
        drawMatrix()
        requestAnimationFrame(update);

    }

    useEffect(() => {
        const canvas = document.getElementById('tetris')
        const context = canvas.getContext('2d')
        context.scale(20, 20)
        context.fillStyle = '#000'
        context.fillRect(0, 0, canvas.height, canvas.width)
        console.log(arena); console.table(arena)

        update();

        
    }, [])

    return (
        <div>
            <canvas id = "tetris" width = {240} height = {400}></canvas>
        </div>
    )
}

export default TetrisComponent
