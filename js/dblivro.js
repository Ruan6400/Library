let Dados;

function Run(){
    let btn_showHide=document.querySelector('body>button:first-of-type')
    Dados = localStorage.getItem("Dados")
    if(Dados == null){Dados = []}else{
        Dados = JSON.parse(Dados).vetor
    }




    //Mostrar, ocultar menu de cadastro de livro
    btn_showHide.addEventListener('click',()=>{
        document.getElementById('Cadastrar').click()
        btn_showHide.innerHTML = btn_showHide.innerHTML=="Cadastrar"?"Fechar":"Cadastrar";
    })

    //Cadastrar os livros
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
            //console.log("o imbecil digitou errado")
            cadastro.reset()
        }else{
            Armazenar()
            cadastro.reset()
        }
    })

    //Pesquisar no banco de dados
    document.querySelector('body>button:last-of-type').addEventListener('click',()=>{
        let val_busca = document.querySelector("form+input").value         
        let consulta = Dados.filter(livro=>{
            let atributos = Object.keys(livro)
            for(let i=0;i<atributos.length;i++){
                if(livro[atributos[i]].toLowerCase().includes(val_busca.toLowerCase())&&val_busca!=""){
                    return true;
                }
            }
            return false;
        })
        console.log(consulta)
    })
}


function Armazenar(){
    const titulo = document.getElementById('titulo').value
    const autor = document.getElementById('autor').value
    const editora = document.getElementById('editora').value
    const codigo = document.getElementById('codigo').value
    const Livro = {titulo:titulo,autor:autor,editora:editora,codigo:codigo}
    Dados.push(Livro)
    localStorage.setItem("Dados",JSON.stringify({vetor:Dados}));
}

document.addEventListener("DOMContentLoaded",Run)