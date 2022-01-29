
require('dotenv').config()

const Urls = require("./listContacts/list.js");
const reg = stringReg();
const bot = createBot();

bot.onText(/\/start/, (msg) => {
    const msgMenu = require('./template/msg.js');
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, msgMenu.tellMenu);
    
    const opts = {
        reply_markup: JSON.stringify({
            keyboard: [
                ['RECEBIMENTO'],
                ['ATENDIMENTO'],
                ['ACERTO DE CONTAS'],
                ['CARGAS'],
                ['INFORMATIVO']
            ]
        })
    };
    bot.sendMessage(msg.chat.id, `Click na opção em seu teclado ⤵`, opts);
});


bot.onText(reg, (msg) => {
    const msgMenu = require('./template/msg.js');
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, `Bem vindo de volta ${msg.chat.first_name}`);
    bot.sendMessage(chatId, msgMenu.tellMenu);

    const opts = {
        reply_markup: JSON.stringify({
            keyboard: [
                ['RECEBIMENTO'],
                ['ATENDIMENTO'],
                ['ACERTO DE CONTAS'],
                ['CARGAS'],
                ['INFORMATIVO']
            ]
        })
    };
    bot.sendMessage(msg.chat.id, `Click na opção em seu teclado ⤵`, opts);
    console.log(msg)
});

/* RegEx FOR START CHAT */
function stringReg() {
    return /(Bom dia)|(bom dia)|(Oi)|(oi)|(Ola)|(Boa noite)|(boa noite)|(Boa tarde)|(boa tarde)/;
}

/* CREATE NEW BOT USING TOKEN */
function createBot() {
    const TelegramBot = require('node-telegram-bot-api');
    const TOKEN = process.env.TOKEN;
    const bot = new TelegramBot(TOKEN,
        {
            polling: true
        }
    );
    return bot;
}

function recebimento(){
    bot.onText(/(RECEBIMENTO)/, (msg) => {
        const chatId = msg.chat.id;
        const msgMenu = require('./template/msg.js');
    
        const opts = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [
                        {
                            text: '👉 CLICK AQUI',
                            callback_data: '1',
                            url: Urls._URLRecebimento
                        }
                    ]
                ]
            })
        };
        bot.sendMessage(chatId, msgMenu.msgHorarioRecebimento)
        bot.sendMessage(chatId, msgMenu.msgContact, opts)
    });
}
recebimento();

function atendimento(){
    bot.onText(/(ATENDIMENTO)/, (msg) => {
        const chatId = msg.chat.id;
        const msgMenu = require('./template/msg.js');
    
        const opts = {
    
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [
                        {
                            text: '👉 CLICK AQUI',
                            callback_data: '1',
                            url: Urls._URLAtendimento
                        }
                    ]
                ]
            })
        };
        bot.sendMessage(chatId, msgMenu.msgHorarioAtendimento)
        bot.sendMessage(chatId, msgMenu.msgContact, opts);
    });
} 
atendimento();

function acertoDeContas(){
    bot.onText(/(ACERTO DE CONTAS)/, (msg) => {
        const chatId = msg.chat.id;
        const msgMenu = require('./template/msg.js');
    
        const opts = {
    
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [
                        {
                            text: '👉 CLICK AQUI',
                            callback_data: '1',
                            url: Urls._URLAcertoDeContas,
                        }
                    ]
                ]
            })
        };
        bot.sendMessage(chatId, msgMenu.msgHorarioAcerto)
        bot.sendMessage(chatId, msgMenu.msgContact, opts);
    });
}
acertoDeContas();

function informativo(){
    bot.onText(/(INFORMATIVO)/, (msg) => {
        const chatId = msg.chat.id;

        /* const url = 'https://docs.google.com/document/d/1mb3YcSJg5yDU6Pc7BxLTtehNuLrcTfe5DkrpbptwC8g/export?format=pdf' */

        bot.sendMessage(chatId, 'Segue um documento informativo de instruções 📑')
        bot.sendDocument(chatId, 'documents/informativoTb.txt')
    });
}
informativo();

/* SECTION CARGAS */
bot.onText(/(CARGAS)/, (msg) => {
    const msgMenu = require('./template/msg.js');
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, msgMenu.msgCargas);
    
    const opts = {
        reply_markup: JSON.stringify({
            inline_keyboard: [
                [
                    {
                        text: '🚛 CARGAS - SC',
                        callback_data: '1',
                        url: Urls._URLSc,
                    }
                ],
                [
                    {
                        text: '🚛 CARGAS - SP',
                        callback_data: '1',
                        url: Urls._URLSp,
                    }
                ],
                [
                    {
                        text: '🚛 CARGAS - PR / RS',
                        callback_data: '1',
                        url: Urls._URLPR_RS,
                    }
                ],
                [
                    {
                        text: '🚛 CARGAS - Nordeste',
                        callback_data: '1',
                        url: Urls._URLNordeste,
                    }
                ],
                [
                    {
                        text: '🚛 Mauro - Encarregado',
                        callback_data: '1',
                        url: Urls._URLEncarregado,
                    }
                ],
                [
                    {
                        text: '🚛 Escala',
                        callback_data: '1',
                        url: Urls._URLEscala,
                    }
                ],
            ]
        })
    };
    bot.sendMessage(msg.chat.id, `Click nas opções na tela 📲`, opts);
});