function Run(){
    let btn_showHide=document.querySelector('body>button:first-of-type')

    btn_showHide.addEventListener('click',()=>{
        document.getElementById('Cadastrar').click()
        btn_showHide.innerHTML = btn_showHide.innerHTML=="Cadastrar"?"Fechar":"Cadastrar";
    })

    let cadastro = document.querySelector("form")
    cadastro.addEventListener('submit',(e)=>{
        e.preventDefault()
        alert("Achou que ia enviar informações do formulário? ACHOU ERRADO")
        cadastro.reset()
        let informacoes = document.querySelectorAll('form input[type="text"]')
        for(let i=0;i<informacoes.length;i++){
            if(informacoes[i].value==""){
                console.log("informações insuficientes");
                i=informacoes.length;
            }
        }
        console.log("ok")
    })
}

document.addEventListener("DOMContentLoaded",Run)