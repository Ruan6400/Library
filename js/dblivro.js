function Run(){
    let btn_showHide=document.querySelector('body>button:first-of-type')
    let Dados = localStorage.getItem("livros")
    if(Dados == null){Dados = []}
    btn_showHide.addEventListener('click',()=>{
        document.getElementById('Cadastrar').click()
        btn_showHide.innerHTML = btn_showHide.innerHTML=="Cadastrar"?"Fechar":"Cadastrar";
    })

    let cadastro = document.querySelector("form")
    cadastro.addEventListener('submit',(e)=>{
        e.preventDefault()
        let informacoes = document.querySelectorAll('form input[type="text"]')
        for(let i=0;i<informacoes.length;i++){
            if(informacoes[i].value==""){
                console.log("informações insuficientes");
                i=informacoes.length;
                informacoes.forEach(input=>{
                    input.value=""
                })
            }
        }
        
        if(informacoes[3].value==""){
            informacoes[3].style.backgroundColor="#f55"
        }else if(
            informacoes[3].value.length != 5 ||
            /[^A-Z]/.test(informacoes[3].value[0]) ||
            /[^a-z]/.test(informacoes[3].value[4]) ||
            /[^0-9]/.test(informacoes[3].value.slice(2,4))
        ){
            alert("o imbecil digitou errado")
        }else{
            const Livro = {titulo,autor,editora,codigo}
            if(Dados.length == 0){
                console.log("não tem nada aqui")
            }
        }
    })
}

document.addEventListener("DOMContentLoaded",Run)