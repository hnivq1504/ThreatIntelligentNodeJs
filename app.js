const {Bot} = require("./bot.js");

const token = "6216004222:AAHo7A_DoK5e6sCdfBHp2VpwOn_H-Hg9Og8";
const chat_id = "-901299271";

const bot = new Bot(token, chat_id);

bot.send_message("test send message from NodeJS code!!!")
.then(() => console.log("Done!!!"))
.catch((error) => console.error("Error sending message: ", error))