require('dotenv').config()
const TelegramApi = require('node-telegram-bot-api')

const token = process.env.TOKEN

const bot = new TelegramApi(token, { polling: true })
//
// const opts = {
//     reply_markup: JSON.stringify({
//         keyboard: [
//             [{ text: 'Начать курс' }]
//         ],
//         resize_keyboard: true,
//     })
// }

const getInvoice = (id) => ({
    chatId: id, // Уникальный идентификатор целевого чата или имя пользователя целевого канала
    providerToken: String(process.env.PROVIDER_TOKEN), // токен выданный через бот @SberbankPaymentBot
    startParameter: 'get_access', //Уникальный параметр глубинных ссылок. Если оставить поле пустым, переадресованные копии отправленного сообщения будут иметь кнопку «Оплатить», позволяющую нескольким пользователям производить оплату непосредственно из пересылаемого сообщения, используя один и тот же счет. Если не пусто, перенаправленные копии отправленного сообщения будут иметь кнопку URL с глубокой ссылкой на бота (вместо кнопки оплаты) со значением, используемым в качестве начального параметра.
    title: 'Курс "Как стать богаче"', // Название продукта, 1-32 символа
    description: 'Этот курс сделает ва нереально БОГАТЫМ!', // Описание продукта, 1-255 знаков
    currency: 'RUB', // Трехбуквенный код валюты ISO 4217
    prices: [{ label: 'Как стать богатым', amount: 100 * 100 }], // Разбивка цен, сериализованный список компонентов в формате JSON 100 копеек * 100 = 100 рублей
    photoUrl:
        'https://i.pinimg.com/474x/4e/50/31/4e503123313645e6e3ebc0a7876255d5.jpg', // URL фотографии товара для счета-фактуры. Это может быть фотография товара или рекламное изображение услуги. Людям больше нравится, когда они видят, за что платят.
    photoWidth: 500, // Ширина фото
    photoHeight: 281, // Длина фото
    payload: {
        // Полезные данные счета-фактуры, определенные ботом, 1–128 байт. Это не будет отображаться пользователю, используйте его для своих внутренних процессов.
        unique_id: `${id}_${Number(new Date())}`,
        provider_token: String(process.env.PROVIDER_TOKEN),
    },
})

bot.onText(/\/start/, async (msg) => {
    console.log(msg)

    const _chatId = msg.chat.id
    const {
        chatId,
        title,
        description,
        payload,
        providerToken,
        currency,
        prices,
    } = getInvoice(_chatId)

    // await bot.sendMessage(chatId, 'Привет, для начала курса нужно ', opts)
    await bot.sendInvoice(chatId, title, description, JSON.stringify(payload), providerToken, currency, prices)
})

// bot.on('callback_query', (callbackQuery) => {
//     const { message } = callbackQuery;
//     const chatId = message.chat.id;
//
//     bot.sendMessage(chatId, 'Spasibo 4to nagal!')
// })
//
// bot.on('message', (msg) => {
//     console.log(msg)
//     const chatId = msg.chat.id;
//     const text = msg.text;
//
//     if (text === '') {
//
//     }
// })
