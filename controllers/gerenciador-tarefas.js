//implementação de funções que retornará no index


//importar ouid
const { v4: uuidv4 } = require('uuid');
//armazenar em memória, entao qdo
//reiniciar o servidor vai perder esses dados



let tarefas = [
    {id:'1', nome:'Aprender React', concluida: true},
    {id:'2', nome:'Aprender node', concluida: false},
    {id:'3', nome:'Estudar padrões de projetos', concluida: false},
    {id:'4', nome:'Estudar JAvascript', concluida: false}
];


function listarTarefaId(req, res){
    const id = req.params.id;
    const tarefa = tarefas.filter(
        t=> t.id === id
    );
    if(tarefa.length === 0){
        res.status(404).json({erro: 'Tarefa não encontrada.'});
    }
    res.json(tarefa[0]);
    //resposta correta padrão é a 200 por isso n precisa utilizar
}

function listarTarefas(req, res){
    const pag = req.query['pag'] || 1;
    const ordem = req.query['ordem']; //ASC , DESC
    const filtroTarefa = req.query['filtro-tarefa'];
    const itensPorPagina = req.query['itens-por-pagina'] || 3;

    //duplicar a lista de tarefas
    let tarefasRetornar = tarefas.slice(0);
    //filtro
    if(filtroTarefa){
        tarefasRetornar = tarefasRetornar.filter(
            t=> t.nome.toLowerCase().indexOf(filtroTarefa.toLowerCase())===0
        );
    }

    //ordernar - ASC E DESC
    if(ordem === 'ASC'){
        tarefasRetornar.sort(
          (t1, t2) => (t1.nome.toLowerCase() > t2.nome.toLowerCase()) ? 1 : -1  
        );
    }else if(ordem === 'DESC'){
        tarefasRetornar.sort(
            (t1, t2) => (t1.nome.toLowerCase() < t2.nome.toLowerCase()) ? 1 : -1  
          );
    }


    //retornar
    res.json({
        totalItens:tarefasRetornar.length,
        tarefas: tarefasRetornar.slice(0).splice((pag-1) * itensPorPagina, itensPorPagina),
        pagina: pag
    });
}


function cadastrarTarefa(req, res){
    //se não tiver nome e concluida
    if(!req.body['nome'] && !req.body['concluida']){
        res.status(400).json({erro: 'Requisição inválida'});
    }
    const tarefa = {
        id: uuidv4(),
        nome: req.body['nome'],
        concluida: req.body['concluida']
    };
    tarefas.push(tarefa);
    res.json(tarefa);
}


function atualizarTarefa(req, res){
    if(!req.body['nome'] && !req.body['concluida']){
        res.status(400).json({erro: 'Requisição inválida'});
    }
    const id = req.params.id;
    let tarefaAtualizada = false;

    tarefa = tarefas.map(tarefa => {
        if(tarefa.id === id) {
            tarefa.nome = req.body['nome'];
            tarefa.concluida = req.body['concluida'];
            tarefaAtualizada = true;
        }
        return tarefa;
    });
    if(!tarefaAtualizada){
        res.status(404).json({erro: 'Tarefa não encontrada'});
    }
    res.json({
        id: id,
        nome: req.body['nome'],
        concluida: req.body['concluida']
    })
}


function removerTarefa(req, res){

    const id = req.params.id;
    const numTarefas = tarefas.length;
    tarefas = tarefas.filter(t => { t.id !== id });
    if(numTarefas === tarefas.length){
        res.status(404).json({erro: 'Tarefa não encontrada.'});
    }
    res.json({msg: 'Tarefa removida com sucesso'});

}


function concluirTarefa(req, res){
    const id = req.params.id;
    let tarefaConcluida = false;
    tarefas = tarefas.map(tarefa=>{
        if(tarefa.id === id){
            tarefa.concluida = true;
            tarefaConcluida = true;
        }
        return tarefa;
    });
    if(!tarefaConcluida){
        res.status(404).json({erro: 'Tarefa não encontrada'})
    }
    res.json({msg: 'Tarefa concluida com sucesso!'});

}

module.exports= {
    listarTarefaId, listarTarefas, cadastrarTarefa, atualizarTarefa, removerTarefa, concluirTarefa
}