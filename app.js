/***********************************************************************************************************************************
 * Objetivo: API responsável em criar endPoints da API whatsapp
 * Data: 30/09/2025
 * Autor: Julio Cesar Santana Alves
 * Versão: 1.0
 * 
 * Observações: Instalar dependencias para criar a API
 *      express - npm install express --save Instala as dependecias para criar uma API
 *      cors    - npm install cors --save Instala as dependecias para configurar as permissões da API
 *      body-parser - npm install body-parser --save Instala as dependecias para receber os tipos de dados via POST ou PUT
************************************************************************************************************************************/

// Import das dependencias
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

// Import do arquivo de funções 
const dados = require('./modulo/funcoes.js')

// Definir porta padrão 
const PORT = process.PORT || 8080

// Instancia na classe do express
const app = express()

app.use((request, response, next) =>{
    response.header('Access-Control-Allow-Origin', '*') // IP de Origem
    response.header('Access-Control-Allow-Methods','GET') // Métodos (Verbos) do protocolo HTTP

    app.use(cors())
    next() // Próximo
})

// Request -> Recebe os Dados da Requisição
// Response -> Envia os Dados na API

// EndPoints

// Retorna a lista de todos os dados
app.get('/v1/dados', function(request,response){
    let allDados = dados.getAllDados()

    response.status(allDados.statuscode)
    response.json(allDados)
})

// Retorna os dados da conta do profile do usuário
app.get('/v1/dados/numero/:numero', function(request, response){
    let numero = request.params.numero
    let dadosConta = dados.getDadosConta(numero)

    response.status(dadosConta.statuscode)
    response.json(dadosConta)
})

// Lista dados de contato para cada usuário

app.get('/v1/dados/contatos/numero/:numero', function(request, response){
    let numero = request.params.numero
    let contatosByUser = dados.getContatosByUser(numero)

    response.status(contatosByUser.statuscode)
    response.json(contatosByUser)
})

// Lista todas as mensagens trocadas de uma conta de usuário

app.get('/v1/dados/conversas/numero/:numero', function(request, response){
    let numero = request.params.numero
    let conversaByUser = dados.getConversaByUser(numero)

    response.status(conversaByUser.statuscode)
    response.json(conversaByUser)
})

// Listar uma conversa de um usuário e um contato
app.get('/v1/dados/mensagens/contato/numero', function(request,response){
    let numero = request.query.numeroProfile
    let contato = request.query.numeroContato


    let conversaByUserEContato = dados.getConversaByUserEContato(numero, contato)
    response.status(conversaByUserEContato.statuscode)
    response.json(conversaByUserEContato)
})

// Realiza um filtro como “pesquisa de palavra chave” com base em uma palavra nas conversas do usuário e do respectivo contato

app.get('/v1/dados/texto/palavra/numero', function(request, response){
    let numero = request.query.numeroProfile
    let contato = request.query.numeroContato
    let palavra = request.query.palavra

    let getConversaByPalavraChave = dados.getConversaByPalavraChave(numero, contato, palavra)
    response.status(getConversaByPalavraChave.statuscode)
    response.json(getConversaByPalavraChave)
})



// Start da API
app.listen(PORT, function(){
    console.log('API aguardando requisições...')
})
