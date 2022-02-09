

let order = []
let clickedOrder = []
let score = 0
let active = false
let limit = 5
let level = 1

const divsLights = [...document.querySelectorAll("div")]
const spanScore = document.querySelector("#score")
const spanMessage = document.querySelector("#message")
const btnStart = document.querySelector("button")



const renderLevelAndScore = ()=>{
    spanScore.innerText = `Nível: ${level}\nPontos: ${score}`
}

renderLevelAndScore()

btnStart.addEventListener("click", ()=>{startGame()})

divsLights.forEach(item=>{
    item.addEventListener("click", ()=>{        
        if(!active){
            return
        }
        clickedOrder.push(divsLights.indexOf(item))
        colorLightUp(item)
        if(order[clickedOrder.length-1] == divsLights.indexOf(item)){
            
            if(clickedOrder.length == limit){
                spanMessage.className = "message_success"
                writerMessage(`Você venceu o nível ${level}, clique em start para o próximo nível`)
                active = false
                level++
            }

            score ++
        }else{
            spanMessage.className = "message_error"
            writerMessage("Você perdeu, tente novamente!")
            active = false
            level = 1
        }        
        renderLevelAndScore()
    })
})


var startGame = ()=>{
    clickedOrder.length = 0
    score = level == 1 ? 0 : score
    order.length = 0 
    shuffOrder()
    renderLevelAndScore()
}


let shuffOrder = async ()=>{
    limit = level + 4
    for(let i = 0; i < limit;i++){
        let randomcolorIndex = Math.floor(Math.random()*4)
        order[order.length] = randomcolorIndex
        let elementColor = divsLights[randomcolorIndex]
        await new Promise(res=>{setTimeout(res,600)})      
        colorLightUp(elementColor, Number(i) + 1)
    }
    
    active = true

    writerMessage("")

}

const colorLightUp = (elementColor, number)=>{
    lightUp(elementColor)
    setTimeout(() => {
        offLight(elementColor)
    }, 500);
}

const writerMessage = (message)=>{
    spanMessage.innerText = message
}

const lightUp = (elementColor)=>{
    elementColor.classList.add(`${elementColor.classList[0]}_up`)
}

const offLight = (elementColor)=>{
    elementColor.classList.remove(`${elementColor.classList[1]}`)
}