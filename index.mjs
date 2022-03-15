import { Telegraf } from "telegraf";
import { TG_BOT_TOKEN } from "./config/index.mjs";
import { http } from "./services/http.mjs";
import { uploadPhoto, uploadPhrase } from "./services/uploadService.mjs";

const bot = new Telegraf(TG_BOT_TOKEN);

bot.command("start", (ctx) => {
  console.log(ctx.from);
  bot.telegram.sendMessage(
    ctx.chat.id,
    "Qloq, puedes subir imagenes o frases para el juego what do you meme. Solo envia la imagen(como archivo) o la frase que quieras enviar"
  );
});

bot.command("phrase", async (ctx) => {
  try {
    const phraseToUpload = ctx.update.message.text.split("/phrase")[1].trim();

    if (!phraseToUpload) {
      return ctx.reply("Debe proporcionar una frase");
    }

    ctx.reply("Subiendo frase...");
    await uploadPhrase(phraseToUpload);
    ctx.reply("Frase subida con exito");
  } catch (error) {
    return ctx.reply("Ocurrio un error al subir la frase");
  }
});

bot.on("document", async (ctx) => {
  const fileId = ctx.update.message.document.file_id;

  try {
    ctx.reply("Subiendo meme...");

    const res = await http.get(
      `https://api.telegram.org/bot${TG_BOT_TOKEN}/getFile?file_id=${fileId}`
    );

    const filePath = res.data.result.file_path;

    const urlToSend = `https://api.telegram.org/file/bot${TG_BOT_TOKEN}/${filePath}`;

    await uploadPhoto(urlToSend);
    ctx.reply("Meme subido con éxito");
  } catch (error) {
    return ctx.reply("Ocurrio un error al subir la frase");
  }
});

bot.launch();

console.log("bot is running");
