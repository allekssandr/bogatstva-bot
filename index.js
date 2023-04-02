const TelegramApi = require('node-telegram-bot-api')

const TOKEN = '6266713445:AAFHzjq8Ls-oxvfpdVKXPnGq53MoCDCJdWo'

const BOT = new TelegramApi(TOKEN, { polling: true })

BOT.on('message', async (msg) => {
    await console.log(msg)

    const text = msg.text
    const chatId = msg.chat.id

    if (text === '/start')
        await BOT.sendMessage(chatId, 'Привет')

    if (text === '/info')
        await BOT.sendMessage(chatId, 'Ты скоро станешь богатым')
})