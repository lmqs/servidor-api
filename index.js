const express =require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { listarTarefaId, listarTarefas, cadastrarTarefa, atualizarTarefa,
    removerTarefa, concluirTarefa } = require('./controllers/gerenciador-tarefas.js');

//criar servidor

const app = express();
const port = 3001;

//sao  middleweres, intercepta todas as requisições *
//cors libera o acesso em dominios diferentes
app.use(cors());
app.use(bodyParser.json()); //envia e recebe formado json

//definição de urls
//get=retorna dados, post=envia dados, put=atualizar dados, delete = excluir,

function naoImplementado(req, res)  {
    res.status(501).json({erro: 'Não implementado.'});
};

//listar todas as tarefas = get
//req = obj da requisição, param de url, headers, etc
//resp = saída de dados
app.get('/gerenciador-tarefas', listarTarefas);


//listar uma tarefa por id = get
app.get('/gerenciador-tarefas/:id', listarTarefaId );

//cadastrar uma tarefa = post
app.post('/gerenciador-tarefas', cadastrarTarefa);

//atualizar uma tarefa = put
app.put('/gerenciador-tarefas/:id', atualizarTarefa);
//deletar uma tarefa = delete
app.delete('/gerenciador-tarefas/:id', removerTarefa);
//concluir uma tarefa = put/patch
app.put('/gerenciador-tarefas/:id/concluir', concluirTarefa);

app.listen(port, () => 
    console.log(`Servidor inicializado na porta ${port}` ));
