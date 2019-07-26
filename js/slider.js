const left = document.querySelector(".slider__left")
const right = document.querySelector(".slider__right")
const  container = document.querySelector(".slider__container");
const slider =document.querySelector('.slider')


right.addEventListener("click", () =>{sliderMovingRight()});
left.addEventListener("click", ()=>{sliderMovingLeft()})
slider.addEventListener('click', () => clearInterval(timerId))
    
const timerId = setInterval(()=>(sliderMovingLeft()) , 5000);


function sliderMovingLeft() {
    const first = container.querySelector(".slider__item:first-child");
        container.classList.add("left")
        if (container.classList.contains("left")) {
                container.classList.remove("left");
                container.appendChild(first)
        }       
        document.documentElement.clientWidth;    
}

function sliderMovingRight() {
    const last = container.querySelector(".slider__item:last-child");
    const first = container.querySelector(".slider__item:first-child");
    
    if (!container.classList.contains("left")) {
            container.classList.add("left");
            container.insertBefore(last, first);
        }

    document.documentElement.clientWidth;
    container.classList.remove("left")
}