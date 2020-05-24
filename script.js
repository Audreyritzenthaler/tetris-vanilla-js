document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid')
    let squares = Array.from(document.querySelectorAll('.grid div'))
    const scoreDisplay = document.querySelector('#score')
    const buttonStart = document.querySelector('#start-button')
    const width = 10
    let nextRandom = 0
    let timerId
    let score = 0


    // Shape of tetrominoes
    const lTetro = [
        [ 1, width+1, width*2+1, 2 ],
        [ width, width+1, width+2, width*2+2 ],
        [ 1, width+1, width*2+1, width*2 ],
        [ width, width*2, width*2+1, width*2+2 ]
    ]

    const zTetro = [
        [ 0, width, width+1, width*2+1 ],
        [ width+1, width+2, width*2, width*2+1 ],
        [ 0, width, width+1, width*2+1 ],
        [ width+1, width+2, width*2, width*2+1 ]
    ]

    const tTetro = [
        [ 1, width, width+1, width+2 ],
        [ 1, width+1, width+2, width*2+1 ],
        [ width, width+1, width+2, width*2+1 ],
        [ 1, width, width+1, width*2+1 ]
    ]

    const oTetro = [
        [ 0, 1, width, width+1 ],
        [ 0, 1, width, width+1 ],
        [ 0, 1, width, width+1 ],
        [ 0, 1, width, width+1 ]
    ]

    const iTetro = [
        [ 1, width+1, width*2+1, width*3+1 ],
        [ width, width+1, width+2, width+3 ],
        [ 1, width+1, width*2+1, width*3+1 ],
        [ width, width+1, width+2, width+3 ]
    ]

    const theTetros = [ lTetro, zTetro, tTetro, oTetro, iTetro ]


    let currentPosition = 4
    let currentRotation = 0

    let random = Math.floor(Math.random()*theTetros.length)

    let current = theTetros[random][currentRotation]


    // Draw the tetromino
    function draw() {
        current.forEach(i => {
            squares[currentPosition + i].classList.add('tetromino')
        } )
    }

    // Undraw the tetromino
    function unDraw() {
        current.forEach( i => {
            squares[currentPosition + i].classList.remove('tetromino')
        })
    }

    // Make the tetro move down every sec
    // timerId = setInterval(moveDown, 1000)

    // Assign keycode
    function control(e) {
        if(e.keyCode === 37) {
            moveLeft()
        }else if(e.keyCode === 38) {
            rotate()
        }else if(e.keyCode === 39) {
            moveRight()
        }else if(e.keyCode === 40) {
            moveDown()
        }
    }
    document.addEventListener('keyup', control)

    // Move Down
    function moveDown() {
        unDraw()
        currentPosition += width
        draw()
        freeze()
    }

    // Freeze function
    function freeze() {
        if (current.some(i => squares[currentPosition + i + width].classList.contains('taken'))) {
            current.forEach( i => squares[currentPosition + i].classList.add('taken'))
            random = nextRandom
            nextRandom = Math.floor(Math.random()*theTetros.length)
            current = theTetros[random][currentRotation]
            currentPosition = 4
            draw()
            displayShape()
            addScore()
        } 
    }

    // Move left
    function moveLeft() {
        unDraw()
        const isAtLeftEdge = current.some(i => (currentPosition + i) % width === 0)

        if(!isAtLeftEdge) currentPosition -=1

        if(current.some(i => squares[currentPosition + i].classList.contains('taken'))) {
            currentPosition +=1
        }

        draw()
    }

    // Move right
    function moveRight() {
        unDraw()
        const isAtRightEdge = current.some(i => (currentPosition + i) % width === width -1)

        if(!isAtRightEdge) currentPosition +=1

        if(current.some(i => squares[currentPosition + i].classList.contains('taken'))) {
            currentPosition -=1
        }

        draw()
    }

    // rotate the tetro
    function rotate() {
        unDraw()
        currentRotation ++
        if(currentRotation === current.length) {
            currentRotation = 0
        }
        current = theTetros[random][currentRotation]
        draw()
    } 

    // Show next tetros !
    const displaySquares = document.querySelectorAll('.mini-grid div')
    const displayWidth = 4
    let displayIndex = 0

    // the tetro without rotation
    const upNextTetro = [
        [ 1, displayWidth+1, displayWidth*2+1, 2 ], // lTetro
        [ 0, displayWidth, displayWidth+1, displayWidth*2+1 ], // zTetro
        [ 1, displayWidth, displayWidth+1, displayWidth+2 ], //tTetro
        [ 0, 1, displayWidth, displayWidth+1 ], //oTetro
        [ 1, displayWidth+1, displayWidth*2+1, displayWidth*3+1 ] // iTetro
    ]

    // Display the shape in the mini grid display
    function displayShape () {
        displaySquares.forEach( squares => {
            squares.classList.remove('tetromino')
        })
        upNextTetro[nextRandom].forEach( i => {
            displaySquares[displayIndex + i].classList.add('tetromino')
        })
    }

    // Add functionnality to button
    buttonStart.addEventListener('click', () => {
        if(timerId) {
            clearInterval(timerId)
            timerId = null
        }else {
            draw()
            timerId= setInterval(moveDown, 1000)
            nextRandom = Math.floor(Math.random()*theTetros.length)
            displayShape()
        }
    })

    function addScore() {
        for (let i = 0; i < 199; i +=width) {
            const row = [ i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9 ]

            if(row.every( i => squares[i].classList.contains('taken'))) {
                score += 1
                scoreDisplay.innerHTML = score
                row.forEach( i => {
                    squares[i].classList.remove('taken')
                    squares[i].classList.remove('tetromino')
                })
                const squaresRemoved = squares.splice(i, width)
                squares = squaresRemoved.concat(squares)
                squares.forEach(cell => grid.appendChild(cell))
            }
        }
    }

    // function gameOver() {
    //     if(current)
    // }










})