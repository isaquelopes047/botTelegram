require('dotenv').config()

const TelegramBot = require('node-telegram-bot-api');   
const TOKEN = process.env.TOKEN

const bot = new TelegramBot(TOKEN, 
    {
        polling: true
    }
);

bot.onText(/(Bom dia)|(bom dia)|(Oi)|(oi)|(Ola)/, (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, 
    `
    Recebemos sua mensagem senhor(a) ${msg.chat.first_name} Escolha uma das opções:

➡ RECEBIMENTO

➡ ATENDIMENTO

➡ ACERTO DE CONTAS
    `);

    const opts = {

        reply_markup: JSON.stringify({
            keyboard: [
            ['RECEBIMENTO'],
            ['ATENDIMENTO'],
            ['ACERTO DE CONTAS']
            ]
        })
    };
    bot.sendMessage(msg.chat.id, `Click na opção em seu teclado ⤵`, opts);
});

bot.onText(/(RECEBIMENTO)/, (msg) => {
    const chatId = msg.chat.id;
    const phoneNumberURL = 'http://t.me/RecebimentoDocumentos';

    const opts = {

        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{
                    keyboardButtonUrl: '#a2fa4880',
                    text: 'CLICK AQUI',
                    callback_data: '1',
                    url: phoneNumberURL
                }]
            ]
        })
    };
    bot.sendMessage(msg.chat.id, `Click no botão abaixo ⤵`, opts);
});

bot.onText(/(ATENDIMENTO)/, (msg) => {
    const chatId = msg.chat.id;
    const phoneNumberURL = 'http://t.me/B_v01';

    const opts = {

        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{
                    keyboardButtonUrl: '#a2fa4880',
                    text: 'CLICK AQUI',
                    callback_data: '1',
                    url: phoneNumberURL
                }]
            ]
        })
    };
    bot.sendMessage(msg.chat.id, `Click no botão abaixo ⤵`, opts);
});

bot.onText(/(ACERTO DE CONTAS)/, (msg) => {
    const chatId = msg.chat.id;
    const phoneNumberURL = 'http://t.me/B_v01';

    const opts = {

        reply_markup: JSON.stringify({
            inline_keyboard: [
                [{
                    keyboardButtonUrl: '#a2fa4880',
                    text: 'CLICK AQUI',
                    callback_data: '1',
                    url: phoneNumberURL
                }]
            ]
        })
    };
    bot.sendMessage(msg.chat.id, `Click no botão abaixo ⤵`, opts);
});