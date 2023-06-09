require("dotenv").config()
const TelegramBot = require('node-telegram-bot-api');

const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.GPT_TKN,
});
const openai = new OpenAIApi(configuration);

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.TELE_TOKEN;

const bot = new TelegramBot(token, {polling: true});


bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    console.log(msg);
    let reply = Incomingmsg(msg.text);
    // send a message to the chat acknowledging receipt of their message
    bot.sendMessage(chatId, reply);
  });


async function Incomingmsg(text){
    const resp = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: text,
        max_tokens: 1200,
        temperature: 0,
      });
    console.log(resp.data);  
    return resp.data.choices[0].text;
}