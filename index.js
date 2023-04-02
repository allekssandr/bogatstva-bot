const TelegramApi = require('node-telegram-bot-api')

const TOKEN = '6266713445:AAFHzjq8Ls-oxvfpdVKXPnGq53MoCDCJdWo'

const BOT = new TelegramApi(TOKEN, { polling: true })

BOT.onText(/\/start/, (msg) => {

    BOT.sendMessage(msg.chat.id, "Welcome", {
        "reply_markup": {
            "keyboard": [[{text: 'Купить курс', callback_data: '/buy'}]]
        }
    });

});