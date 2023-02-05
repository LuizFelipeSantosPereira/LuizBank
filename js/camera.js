const botaoInciarCamera = document.querySelector("[data-video-botao]")
const campoCamera = document.querySelector("[data-camera]")
const video = document.querySelector("[data-video]")

const botaoTirarFoto = document.querySelector("[data-tirar-foto]")
const canvas = document.querySelector("[data-video-canvas]")
const mensagem = document.querySelector("[data-mensagem]")

let imagemURL = ""

const botaoEnviarFoto = document.querySelector("[data-enviar]")

botaoInciarCamera.addEventListener("click", async function (){//inicia a reprodução de video
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false})

    botaoInciarCamera.style.display="none"//tira o botao 
    campoCamera.style.display = "block"//mostra o elemento do video em tempo real

    video.srcObject = iniciarVideo;
})

botaoTirarFoto.addEventListener("click", ()=>{//tira uma foto nas mesmas proporções do video
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)

    imagemURL = canvas.toDataURL("image/jpeg")

    campoCamera.style.display = "none"
    mensagem.style.display = "block"
})

botaoEnviarFoto.addEventListener("click", ()=>{
    const receberDadosExistentes = localStorage.getItem("cadastro")
    const converteRetorno = JSON.parse(receberDadosExistentes)

    converteRetorno.imagem = imagemURL//cria um atributo "imagem" no objeto que recebe e recebe o conteudo de imagemURL

    localStorage.setItem("cadastro", JSON.stringify(converteRetorno))//salva a imagem juntamente com os dados anteriores

    window.location.href="./abrir-conta-form-3.html"//redireciona para a última página do cadastro
})