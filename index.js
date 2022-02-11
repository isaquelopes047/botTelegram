
require('dotenv').config()
const nodeSchedule = require('node-schedule');

const Urls = require("./listContacts/list.js");
const reg = stringReg();
const bot = createBot();

function infoMsg(msg) {
    console.log(msg.from.username, msg.from.id);
}

// START CHAT
bot.onText(/\/start/, (msg) => {
    const msgMenu = require('./template/msg.js');
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, msgMenu.tellMenu);
    
    const opts = keyboardOptions();
    infoMsg(msg)
    bot.sendMessage(msg.chat.id, `Ou digite o desejado`, opts);

    // mesangem de 6 em 6 horas
    const job = nodeSchedule.scheduleJob('0 0 0/6 1/1 * ? *', () => {
        bot.sendMessage(msg.chat.id, `Lembrando que as fotos dos comprovantes de entregas devem ser enviadas o mais rapido possivel ao setor de recebimento`);
    });
});

// CHAT MENU
bot.onText(reg, (msg) => {
    const msgMenu = require('./template/msg.js');
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, `Bem vindo de volta ${msg.chat.first_name}`);
    bot.sendMessage(chatId, msgMenu.tellMenu);

    const opts = keyboardOptions();
    infoMsg(msg)
    bot.sendMessage(msg.chat.id, `Ou digite o desejado`, opts);

    // mesangem de 6 em 6 horas
    const job = nodeSchedule.scheduleJob('0 0 0/6 1/1 * ? *', () => {
        bot.sendMessage(msg.chat.id, `Lembrando que as fotos dos comprovantes de entregas devem ser enviadas o mais rapido possivel ao setor de recebimento`);
    });
});

// Template Menu Kayboard
function keyboardOptions() {
    return {
        reply_markup: JSON.stringify({
            keyboard: [
                ['Recebimento'],
                ['Atendimento'],
                ['Acerto de contas'],
                ['Cargas'],
                ['Procedimento'],
                ['Ti'],
            ]
        })
    };
}

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
    console.log('Servidor aberto')
    return bot
}

// Block Recebimento
function recebimento(){
    bot.onText(/Recebimento/, (msg) => {
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

        infoMsg(msg);
        bot.sendMessage(chatId, msgMenu.msgHorarioRecebimento)
        bot.sendMessage(chatId, msgMenu.msgContact, opts)
    });

}
recebimento();

// Block Atendimento
function atendimento(){
    bot.onText(/(Atendimento)/, (msg) => {
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

        infoMsg(msg);
        bot.sendMessage(chatId, msgMenu.msgHorarioAtendimento)
        bot.sendMessage(chatId, msgMenu.msgContact, opts);
    });
} 
atendimento();

// Block Acerto de Contas
function acertoDeContas(){
    bot.onText(/(Acerto de contas)/, (msg) => {
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

        infoMsg(msg)
        bot.sendMessage(chatId, msgMenu.msgHorarioAcerto)
        bot.sendMessage(chatId, msgMenu.msgContact, opts);
    });
}
acertoDeContas();


// Block Ti
function ti(){
    bot.onText(/(Ti)/, (msg) => {
        const chatId = msg.chat.id;
        const msgMenu = require('./template/msg.js');
    
        const opts = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [
                        {
                            text: '🖥 Isaque - TI',
                            callback_data: '1',
                            url: Urls._URLTiUm,
                        }
                    ],
                    [
                        {
                            text: '🖥 Anderson - TI',
                            callback_data: '1',
                            url: Urls._URLTiDois,
                        }
                    ],
                    [
                        {
                            text: '🖥 Eduir - TI',
                            callback_data: '1',
                            url: Urls._URLTiTres,
                        }
                    ],
                ]
            })
        };

        infoMsg(msg)
        bot.sendMessage(chatId, msgMenu.msgHorarioTi)
        bot.sendMessage(msg.chat.id, `Click nas opções na tela 📲`, opts);
    });
}
ti();


// Dowloader Document
function informativo(){
    bot.onText(/(Procedimento)/, (msg) => {
        const chatId = msg.chat.id;

        /* const url = 'https://docs.google.com/document/d/1mb3YcSJg5yDU6Pc7BxLTtehNuLrcTfe5DkrpbptwC8g/export?format=pdf' */

        infoMsg(msg)
        bot.sendMessage(chatId, '<b>Segue um documento informativo de instruções</b> 📑', {parse_mode: 'HTML'})
        bot.sendDocument(chatId, 'documents/informativoTb.txt')
    });

    function infoMsg(msg) {
        console.log(msg.from.username, msg.from.id, 'Solicitado Documento de informação');
    }
}
informativo();

/* SECTION CARGAS */
bot.onText(/(Cargas)/, (msg) => {
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
    infoMsg(msg)
    bot.sendMessage(msg.chat.id, `Click nas opções na tela 📲`, opts);
});