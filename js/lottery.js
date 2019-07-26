
const errorMsgBlock = document.querySelector(".lottery__error-msg")
const gameStartButton = document.querySelector("#game-start-button")
const lotteryItems = document.querySelectorAll(".lottery__item")
const lotteryField = document.querySelector('.lottery__field')
const modal = document.querySelector('.modal')
const closeButton = document.querySelector("#modal_btn");
const clearFieldButton = document.querySelector('#clear-field-button')

const startGameButtonText  = "Мне повезет".toUpperCase()
const reStartGameButtonText = "Сыграть еще".toUpperCase()
const allMarkedCellsCount = []
let randomNumbersArr =[]
let guesCount = 0


lotteryField.addEventListener('click', (e)=>{
    let active = gameStartButton.innerText ===  startGameButtonText
    if(e.target.className === "lotterry__cell" && active){
        e.target.className += " lottery__marked-cell"
    }
    else if(e.target.className === "lotterry__cell lottery__marked-cell" && active){
        e.target.className = "lotterry__cell"       
    }
    cartValidation()
})

gameStartButton.addEventListener('click',(e) =>{
    if(e.target.innerText == startGameButtonText){
        clearFieldButton.disabled = true
        startGame()        
    }
    else{
        newGame()
        clearFieldButton.disabled = false
    }
})

closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

clearFieldButton.addEventListener('click', () =>{
    clearGameField()
    cartValidation()
})

function cartValidation(){ 
    lotteryItems.forEach((cart, i) => {
        let countOfMarkedCells = 0
       for(let i = 0; i < cart.children.length; i++ ){
          if(cart.children[i].className === "lotterry__cell lottery__marked-cell"){
            countOfMarkedCells++   
          }
      } 

      if(countOfMarkedCells > 5){
        cart.className += " lottery__item-border-red"
      }
      else{
        cart.className = "lottery__item"
      }
      allMarkedCellsCount[i] = countOfMarkedCells  
 
    })
    errorDisplay()
    gameButtonActivation()
}

function errorDisplay(){
    const isErrorDisplay = allMarkedCellsCount.some( el => el > 5)
    isErrorDisplay ? errorMsgBlock.style.visibility ='visible' : errorMsgBlock.style.visibility ='hidden'
}

function gameButtonActivation(){
    const countOfValidCard = allMarkedCellsCount.filter((el => el === 5)).length
    countOfValidCard === 5 ? gameStartButton.disabled = false : gameStartButton.disabled = true
    gameStartButton.innerText === reStartGameButtonText ? gameStartButton.disabled =false : null
}

function newGame(){
    gameStartButton.innerText = startGameButtonText
    gameStartButton.disabled = true
    clearGameField()
}

function startGame(){
    gameStartButton.innerText = reStartGameButtonText 
    setRandomNumbers()
    markRightNumbers()
}

function clearGameField(){
    lotteryItems.forEach((cart) => {
        for(let i = 0; i < cart.children.length; i++ ){
           cart.children[i].className = "lotterry__cell"     
       } })
}

function setRandomNumbers(){
    randomNumbersArr =[]
    for(let i = 0; i < 5; i++){
        randomNumbersArr[i] = []
        while(randomNumbersArr[i].length < 5){
            let temp = Math.floor(Math.random()*20) + 1;
            if(randomNumbersArr[i].indexOf(temp) === -1) {
                randomNumbersArr[i].push(temp)
            }            
        }
    }
}

function markRightNumbers(){
    gameStartButton.disabled = true 
    let count = 0;
    lotteryItems.forEach((cart, index) => {       
        randomNumbersArr[index].forEach( (cell, i ) =>{
            count++
            setTimeout(() =>{
                cart.children[cell - 1].className += ' green'
            }, 100 * count)
                
        })
    })
    setTimeout(() =>{
        gameStartButton.disabled = false 
        countOfGuestNumb()
        toggleModal()
    }, 2500)
}

function countOfGuestNumb(){    
    guesCount = 50 - document.querySelectorAll('.lottery__marked-cell, .green').length
}

function toggleModal() {
    const modalContent = document.querySelector('.modal__content-text')
    modal.classList.toggle("show-modal");    
    modalContent.innerText = `Вы угадали чисел - ${guesCount}!`
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}



