/******************************************************************************************
 * Objetivo: Arquivo responsável pelas funções para criar a API do whatsapp
 * Data: 22/09/2025
 * Autor: Julio Cesar Santana Alves
 * Versão: 1.0
 *******************************************************************************************/

// Importe de arquivo estados_cidades
const dados = require('./contatos.js')
const MESSAGE_ERROR = { status: false, statuscode: 500, development: 'Julio Cesar' }

// Retorna a lista de todos os dados
const getAllDados = function() {
    let message = { status: true, statuscode: 200, development: 'Julio Cesar' }

    message.dados = dados.contatos['whats-users']

    if (message.dados.length > 0) {
        return message
    } else {
        return MESSAGE_ERROR
    }
}

const getDadosConta = function(numero) {
    let message = { status: true, statuscode: 200, development: 'Julio Cesar', nick: '', foto: '', numero: '', corFundo: '', dataCriacao: '', dataTermino: '' }

    dados.contatos['whats-users'].forEach(item => {
        if (item.number === numero) {
            message.numero = item.number
            message.nick = item.nickname
            message.foto = item['profile-image']
            message.corFundo = item.background
            message.dataCriacao = item['created-since'].start
            message.dataTermino = item['created-since'].end
        }
    })
    if (numero === message.numero) {
        return message
    } else {
        return MESSAGE_ERROR
    }
}

const getContatosByUser = function(number) {
    let message = { status: true, statuscode: 200, development: 'Julio Cesar', usuario: '', contatos: [] }

    dados.contatos['whats-users'].forEach(item => {
        if (item.number === number) {
            message.usuario = item.account
            item.contacts.forEach(contato => {

                delete contato.messages

                message.contatos.push(contato)

            })
        }
    })

    if (message.usuario.length > 0) {
        return message
    } else {
        return MESSAGE_ERROR
    }
}

const getConversaByUser = function(number) {
    let message = { status: true, statuscode: 200, development: 'Julio Cesar', usuario: '', mensagens: [] }

    dados.contatos['whats-users'].forEach(item => {
        if (item.number === number) {
            message.usuario = item.account
            item.contacts.forEach(contato => {

                message.mensagens.push(...contato.messages)

            })
        }
    })

    if (message.usuario.length > 0) {
        return message
    } else {
        return MESSAGE_ERROR
    }
}

const getConversaByUserEContato = function(numeroProfile, numeroContato) {
    let message = { status: true, statuscode: 200, development: 'Julio Cesar', usuario: '', contato: '', mensagens: [] }

    dados.contatos['whats-users'].forEach(item => {
        if (item.number === numeroProfile) {
            message.usuario = item.account
            item.contacts.forEach(Event => {
                if (Event.number === numeroContato) {
                    message.mensagens.push(Event.messages)
                    message.contato = Event.name
                }
            })
        }
    })

    if (message.usuario.length > 0) {
        return message
    } else {
        return MESSAGE_ERROR
    }
}

const getConversaByPalavraChave = function(numeroProfile, numeroContato, palavra) {
    let message = { status: true, statuscode: 200, development: 'Julio Cesar', usuario: '', contato: '', mensagens: [] }
    const palavraDeBusca = palavra

    dados.contatos['whats-users'].forEach(item => {
        if (item.number === numeroProfile) {
            message.usuario = item.account
            item.contacts.forEach(Event => {
                if (Event.number === numeroContato) {
                    message.contato = Event.name
                    const conversaFiltrada = Event.messages.filter(palavra => {
                        return palavra.content.toLowerCase().includes(palavraDeBusca.toLowerCase())
                    })
                    message.mensagens.push(conversaFiltrada)
                }
            })
        }
    })
    if (message.usuario.length > 0) {

        return message

    } else {
        return MESSAGE_ERROR
    }
}

// console.log(getAllDados())
// console.log(getDadosConta('11987876567'))
// console.log(getContatosByUser('11987876567'))
// console.log(getConversaByUser('11987876567'))
console.log(getConversaByUserEContato('11987876567', '26999999963'))
    // console.log(JSON.stringify(getConversaByPalavraChave('11987876567', '26999999963', 'Leonid'), null, 2) )
    // teste

module.exports = {
    getAllDados,
    getDadosConta,
    getContatosByUser,
    getConversaByUser,
    getConversaByUserEContato,
    getConversaByPalavraChave
}