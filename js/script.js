

let order = []
let clickedOrder = []
let score = 0
let activeClick = false
let limit = 5
let level = 1

const divsLights = [...document.querySelectorAll("div")]
const spanScore = document.querySelector("#score")
const spanMessage = document.querySelector("#message")
const btnStart = document.querySelector("button")
const gameClickArea = document.querySelector("aside")

const startGame = ()=>{
    clickedOrder.length = 0
    score = level == 1 ? 0 : score
    order.length = 0 
    shuffOrder()
    renderLevelAndScore()
    writerMessage("")
}

const renderLevelAndScore = ()=>{
    spanScore.innerText = `Nível: ${level}\nPontos: ${score}`
}

const shuffOrder = async ()=>{
    limit = level + 4
    for(let i = 0; i < limit;i++){
        let randomcolorIndex = Math.floor(Math.random()*4)
        order[order.length] = randomcolorIndex
        let elementColor = divsLights[randomcolorIndex]
        await new Promise(res=>{setTimeout(res,600)})      
        colorLightUp(elementColor, Number(i) + 1)
    }    
    activeClick = true
    writerMessage("")
}

const colorLightUp = (elementColor, number)=>{
    lightUp(elementColor)
    setTimeout(() => {
        offLight(elementColor)
    }, 500);
}

const writerMessage = (message, classColor = "message_success")=>{
    spanMessage.innerText = message
    spanMessage.className = classColor
}

const lightUp = (elementColor)=>{
    elementColor.classList.add(`${elementColor.classList[0]}_up`)
}

const offLight = (elementColor)=>{
    elementColor.classList.remove(`${elementColor.classList[1]}`)
}

const checkPoint = (elementClicked)=>{
    const isCorrectClick = order[clickedOrder.length-1] == divsLights.indexOf(elementClicked)
    if(isCorrectClick){
        const isCompleteLevel = clickedOrder.length == limit            
        if(isCompleteLevel){            
            writerMessage(`Você venceu o nível ${level}, clique em start para o próximo nível`, "message_success")
            activeClick = false
            level++
        }
        score ++
    }else{
        writerMessage("Você perdeu, tente novamente!", "message_error")
        activeClick = false
        level = 1
    }  
}

const addIndexClicked = elementClicked=>{
    clickedOrder.push(divsLights.indexOf(elementClicked))
}

gameClickArea.addEventListener("click", (event)=>{    
    const elementClicked = event.target
    const isActivedGameClick = activeClick && elementClicked.tagName == "DIV"    
    if(!isActivedGameClick){
        return
    }
    addIndexClicked(elementClicked)
    colorLightUp(elementClicked)    
    renderLevelAndScore()
    checkPoint(elementClicked)
    console.log(clickedOrder)
    
})

btnStart.addEventListener("click", ()=>{startGame()})


renderLevelAndScore()







