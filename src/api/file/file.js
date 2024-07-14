import { message_buffer } from "../message/message.js";
import * as channel from "../chzzk/channel.js";

const writeFile = async (content) => {
  return new Promise((resolve, reject) => {
    const blob = new Blob([content], { type: "text/plain" });
    const a = document.createElement("a");
    a.download = "output.txt";
    a.href = URL.createObjectURL(blob);
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(a.href);
    resolve();
  });
};

const saveFile = async (data) => {
  try {
    await writeFile(data);
    console.log("File saved successfully");
  } catch (error) {
    console.error("Error saving file:", error);
  }
};

const flushBuffer = async () => {
  const channel_detail = await channel
    .getChannelDetail()
    .then((r) => r.content);
  console.log(channel_detail);
  const channel_data = `${channel_detail.liveTitle} ${channel_detail.channel.channelId} ${channel_detail.concurrentUserCount}\n`;
  const messages_data = message_buffer.map((m) => {
    return `${m.nick} ${m.uid}: ${m.msg} ${m.osType} ${m.utime}`;
  });

  const content = channel_data + messages_data.join("\n");
  saveFile(content);
};

export { saveFile, flushBuffer };
