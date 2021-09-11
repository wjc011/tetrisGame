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
        update();

        
    }, [])

    return (
        <div>
            <canvas id = "tetris" width = {240} height = {400}></canvas>
        </div>
    )
}

export default TetrisComponent
