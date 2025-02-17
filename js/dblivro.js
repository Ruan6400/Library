let Dados;

function Run(){
    let btn_showHide=document.querySelector('#Cadastro>button:first-of-type')
    Dados = localStorage.getItem("Dados")
    if(Dados == null){Dados = []}else{
        Dados = JSON.parse(Dados).vetor
    }


    //Mostrar, ocultar menu de cadastro de livro
    btn_showHide.addEventListener('click',()=>{
        document.getElementById('Cadastrar').click()
        btn_showHide.innerHTML = btn_showHide.innerHTML=="Cadastrar"?"Fechar":"Cadastrar";
    })

    document.getElementById('interruptor').addEventListener('click',
        ()=>document.getElementById('automatico').click())


    //Cadastrar os livros
    let cadastro = document.querySelector("form")
    cadastro.addEventListener('submit',(e)=>{
        e.preventDefault()
        let informacoes = document.querySelectorAll('form input[type="text"]')
        for(let i=0;i<informacoes.length;i++){
            if(informacoes[i].value=="" && !document.getElementById('automatico').checked){
                console.log("informações insuficientes");
                i=informacoes.length;
                informacoes.forEach(input=>{
                    input.value=""
                })
            }
        }
        
        if(informacoes[3].value==""){
            if(document.getElementById("automatico").checked){
                let Codigo;
                do{
                    Codigo = GerarCodigo();
                    let consulta = Dados.filter(dado=>dado.codigo == Codigo)
                    if(consulta.length>0){Codigo = ""}
                }while(Codigo == "")
                document.getElementById('codigo').value = Codigo
                Armazenar()
                cadastro.reset()
            }else{
                informacoes[3].style.backgroundColor="#f55"
            }
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
    document.querySelector('#Pesquisa>button:last-of-type').addEventListener('click',()=>{
        let val_busca = document.querySelector("#Pesquisa input").value         
        let consulta = Dados.filter(livro=>{
            let atributos = Object.keys(livro)
            for(let i=0;i<atributos.length;i++){
                if(livro[atributos[i]].toLowerCase().includes(val_busca.toLowerCase())&&val_busca!=""){
                    return true;
                }
            }
            return false;
        })
        if(consulta.length>0){
            let deletar = document.querySelector('table')
            if(deletar!=null){deletar.remove()}
            let table = document.createElement('table')
            table.insertAdjacentHTML('beforeend',`
            <thead>
                <tr></tr>
            </thead>
            <tbody>
            </tbody>`)
            document.getElementById('Pesquisa').insertAdjacentElement('beforeend',table)
            Object.keys(consulta[0]).forEach(att=>{
                document.querySelector('thead>tr').insertAdjacentHTML('beforeend','<th>'+att+'</th>')
            })
            consulta.forEach(livro=>{
                let tr = document.createElement('tr')
                Object.keys(livro).forEach(att=>{
                    tr.insertAdjacentHTML('beforeend','<td>'+livro[att]+'</td>')
                })
                tr.insertAdjacentHTML('beforeend','<td><button>X</button></td>')
                document.querySelector('tbody').insertAdjacentElement('beforeend',tr)
                let bt = document.querySelector('tbody>tr:last-of-type button')
                bt.addEventListener('click',()=>{
                })
            })
            
        }
        
        

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

function GerarCodigo(){
    const Inicial = document.getElementById('editora').value[0].toUpperCase()
    let Randomnum = ""
    for(let i=0;i<3;i++){Randomnum+=Math.round(Math.random()*9);}
    const Nome_Autor = document.getElementById('autor').value.split(" ");
    const Sobrenome = Nome_Autor[Nome_Autor.length-1]
    const Final = Sobrenome[0].toLowerCase()

    return Inicial+Randomnum+Final;
}

document.addEventListener("DOMContentLoaded",Run)