/*
Recebe a data de nascimento do usuário. 
Se a idade for menor que 18, o campo do formulário é tido como inválido
*/

export default function validacaoIdade(campo){
    const dataNascimentoUsuario = new Date(campo.value)

    if(!validaIdade(dataNascimentoUsuario)){
        campo.setCustomValidity('O usuário não é maior de idade')
    }
}
function validaIdade(nascimento){
    const dataAtual = new Date()
    const dataEmQueUsuarioFez18 = new Date(
        nascimento.getUTCFullYear()+18, 
        nascimento.getUTCMonth(), 
        nascimento.getUTCDate()
    )
    return dataAtual>= dataEmQueUsuarioFez18
}