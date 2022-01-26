require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api');   
const TOKEN = process.env.TOKEN

const bot = new TelegramBot(TOKEN, 
    {
        polling: true
    }
);

bot.onText(/\/start/, (msg) => {
    const msgMenu = require('./template/msg.js');
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 'Bem vindo ao atendimento virtual TB')
    bot.sendMessage(chatId, msgMenu.tellMenu);
    
    const opts = {
    
        reply_markup: JSON.stringify({
            keyboard: [
                ['RECEBIMENTO'],
                ['ATENDIMENTO'],
                ['ACERTO DE CONTAS'],
            ]
        })
    };
    bot.sendMessage(msg.chat.id, `Click na opção em seu teclado ⤵`, opts);
});

bot.onText(/(Bom dia)|(bom dia)|(Oi)|(oi)|(Ola)/, (msg) => {
    const msgMenu = require('./template/msg.js');
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, msgMenu.tellMenu);

    const opts = {

        reply_markup: JSON.stringify({
            keyboard: [
                ['RECEBIMENTO'],
                ['ATENDIMENTO'],
                ['ACERTO DE CONTAS'],
            ]
        })
    };
    bot.sendMessage(msg.chat.id, `Click na opção em seu teclado ⤵`, opts);
});

function recebimento(){
    bot.onText(/(RECEBIMENTO)/, (msg) => {
        const chatId = msg.chat.id;
        const phoneNumberURL = 'http://t.me/RecebimentoDocumentos';
        const msgMenu = require('./template/msg.js');
    
        const opts = {
    
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{
                        text: '👉 CLICK AQUI',
                        callback_data: '1',
                        url: phoneNumberURL
                    }]
                ]
            })
        };
        bot.sendMessage(chatId, msgMenu.msgHorarioRecebimento)
        bot.sendMessage(chatId, `Click no botão abaixo ⤵`, opts)
    });
}
recebimento();

function atendimento(){
    bot.onText(/(ATENDIMENTO)/, (msg) => {
        const chatId = msg.chat.id;
        const phoneNumberURL = 'http://t.me/B_v01';
        const msgMenu = require('./template/msg.js');
    
        const opts = {
    
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{
                        text: '👉 CLICK AQUI',
                        callback_data: '1',
                        url: phoneNumberURL
                    }]
                ]
            })
        };
        bot.sendMessage(chatId, msgMenu.msgHorarioAtendimento)
        bot.sendMessage(chatId, `Click no botão abaixo ⤵`, opts);
    });
} 
atendimento();

function acertoDeContas(){
    bot.onText(/(ACERTO DE CONTAS)/, (msg) => {
        const chatId = msg.chat.id;
        const phoneNumberURL = 'http://t.me/B_v01';
        const msgMenu = require('./template/msg.js');
    
        const opts = {
    
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{
                        text: '👉 CLICK AQUI',
                        callback_data: '1',
                        url: phoneNumberURL,
                    }]
                ]
            })
        };
        bot.sendMessage(chatId, msgMenu.msgHorarioAcerto)
        bot.sendMessage(chatId, `Click no botão abaixo ⤵`, opts);
    });
}
acertoDeContas();
