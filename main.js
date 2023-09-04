$(".card").shuffle()

let tiempoTranscurrido
let cartaAnterior
let temporizador

$(".card").click(async function () {
    const cartaActual = $(this)
    mostrarCarta(cartaActual)

    if(!tiempoTranscurrido)
        temporizador = empezarTemporizador()

    if (!cartaAnterior) 
        return cartaAnterior = $(this)
        
    if(cartaAnterior.is(cartaActual)) return

    if(sonIguales(cartaAnterior, cartaActual)){
        cartaActual.fadeOut()
        cartaAnterior.fadeOut()
        cartaAnterior = undefined
        console.log($(".card:visible").length)
        if($(".card:visible").length === 2){ //Parece que se borran tarde entonces sigue diciendo 2 al momento de ganar
            clearInterval(temporizador)
            $("h3").html(`FIN DEL JUEGO: ${$("h3").html()}`)
        }
        return
    }
    await sleep(400)
    ocultarCarta(cartaActual)
    ocultarCarta(cartaAnterior)
    cartaAnterior = undefined  
})

$("button").click(() => {
    clearInterval(temporizador)
    temporizador = undefined
    cartaAnterior = undefined
    tiempoTranscurrido = undefined
    $("h3").html("--.--")
    $(".card").shuffle()
    $(".card").map(function(){
        ocultarCarta($(this))
        $(this).fadeIn()
        console.log($(this))
    })
})

function sonIguales(cartaAnterior, cartaActual){
    return cartaAnterior.find(":last-child").attr("src") == cartaActual.find(":last-child").attr("src")
}

function ocultarCarta(carta){
    carta.find(":first-child").css("opacity", 1)
}

function mostrarCarta(carta){
    carta.find(":first-child").css("opacity", 0)
}

function empezarTemporizador(){
    tiempoTranscurrido = 0
    return setInterval(() => {
        tiempoTranscurrido++
        
        $("h3").html(`${(tiempoTranscurrido / 100).toPrecision(tiempoTranscurrido.toString().length)}s`)
    }, 10)
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}