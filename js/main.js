import validacaoCpf from "./validaCpf.js"
import validacaoIdade from "./validaIdade.js"

const camposFormulario = document.querySelectorAll('[required]')//encontra os inputs do formulário
const formulario = document.querySelector('[data-formulario]')//encontra o formulário

formulario.addEventListener("submit", (evento)=>{
    evento.preventDefault()//impede o recarregamento da página
    
    const listaRespostas = {//encontra o valor passado nos inputs do formulário e guarda num objeto
        "nome": evento.target.elements["nome"].value,
        "email": evento.target.elements["email"].value,
        "rg": evento.target.elements["rg"].value,
        "ncpfome": evento.target.elements["cpf"].value,
        "aniversario": evento.target.elements["aniversario"].value,
    }
        
    localStorage.setItem("cadastro", JSON.stringify(listaRespostas))//armazena o objeto no localStorage

    window.location.href= './abrir-conta-form-2.html'//muda de pagina para o próximo estágio do cadastro
})

camposFormulario.forEach((campo) => {//para cada input, acrescenta eventos para tratamento de erros
    campo.addEventListener("blur", ()=>verificaCampo(campo))
    campo.addEventListener("invalid", evento=>evento.preventDefault)
})

const tiposDeErro=[//cria um array com os nomes dos tipos de erros mais comuns
    'valueMissing',
    'typeMismatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {//cria um objeto com as mensagens de erro para cada input e seu respectivo tipo de erro
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo){//função onde concentra todas as validações dos campos
    let mensagem = ""//esvazia o conteúdo das mensagens de erro
    campo.setCustomValidity('')//esvazia o conteúdos das mensagens de erro customizadas

    if (campo.name == "cpf" && campo.value.length >= 11){
        validacaoCpf(campo)

    }else if(campo.name=="aniversario" && campo.value!=""){
        validacaoIdade(campo)

    }

    tiposDeErro.forEach(erro=>{//define uma mensagem de erro para cada campo e tipo de erro
        if (campo.validity[erro]){
            mensagem = mensagens[campo.name][erro]
        }
    })
    
    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro')//encontra o elemento que receberá as mensagens de erro do respectivo campo
    const validadorDeInput = campo.checkValidity();//identifica as validações do campo

    if(!validadorDeInput){//se for inválido, mostra sua respectiva mensagem
        mensagemErro.textContent = mensagem
    }else{//se não, limpa o conteúdo
        mensagemErro.textContent = ""
    }
}