
const grid=document.querySelector(".grid")
const startBtn=document.getElementById("startBtn")
const scoreDisplay=document.getElementById("score")
const squares=[]

let currentSnake=[2,1,0]

let direction=1
const width=10

let appleIndex=0
let score=0

let intervalTime=1000
let timerId=0
let speed=0.9

//Creating grid
function createGrid(){
    for(let i=0;i<100;i++){

        const box=document.createElement("div")

        box.classList.add("box")
        grid.appendChild(box)
        squares.push(box)
    }
    
}    
createGrid()

currentSnake.forEach(index => squares[index].classList.add('snake'));


 startBtn.addEventListener("click",startGame)
function startGame() {

    //remove snake
    currentSnake.forEach(index => squares[index].classList.remove('snake'))

    //remove apple
    squares[appleIndex].classList.remove('apple')
    clearInterval(timerId)

    currentSnake = [2,1,0]
    score = 0

    //re add new score
    scoreDisplay.textContent = score

    direction = 1
    intervalTime = 1000
    
    generateApple()

    //readd the class of snake to our new currentSnake
    currentSnake.forEach(index => squares[index].classList.add('snake'))
    timerId = setInterval(move, intervalTime)
}



function move(){


    if(
        (currentSnake[0] % width === 0 && direction=== -1)|| //left wall
        (currentSnake[0] % width === width-1 && direction===1)||     //right
        (currentSnake[0] + width >= width*width && direction=== width)||  //bottom
        (currentSnake[0] - width < 0 && direction=== -width)||  //top wall
        (squares[currentSnake[0] + direction].classList.contains("snake"))
        )  
     return clearInterval(timerId)    
    
        
    

    const tail=currentSnake.pop(); 
    
    squares[tail].classList.remove("snake")
    
    currentSnake.unshift(currentSnake[0]+direction)
    
    
    //when snake gets an apple
    if(squares[currentSnake[0]].classList.contains("apple")){
     
        squares[currentSnake[0]].classList.remove("apple")

        squares[tail].classList.add("snake")
        currentSnake.push(tail)
        
        generateApple()

        score++

        scoreDisplay.textContent=score

        //speed up snake

        clearInterval(timerId)
        intervalTime=intervalTime * speed 
        timerId=setInterval(move,intervalTime)
        

      }

    squares[currentSnake[0]].classList.add("snake")

 }

 

      
function generateApple(){

    do{
        appleIndex=Math.floor( Math.random()* squares.length )

    } while(squares[appleIndex].classList.contains('snake')) //if apple at same pos as snake

    squares[appleIndex].classList.add("apple")
}   
generateApple()


function changeDirection(e){
  
    if(e.key === "ArrowLeft"){
        direction = -1
    
    }
    else if(e.key === "ArrowRight"){
        direction = 1
        
    }
    else if(e.key=== "ArrowDown"){
        direction= +width
    
    }
    else if(e.key=== "ArrowUp"){
        direction = -width
        
    }
          
}

document.addEventListener("keyup",changeDirection )