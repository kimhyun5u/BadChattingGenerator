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

  const channel_data = {
    liveTitle: channel_detail.liveTitle,
    channelId: channel_detail.channel.channelId,
    currentUserCount: channel_detail.concurrentUserCount,
  };
  const messages_data = message_buffer.map((m) => {
    return {
      nick: m.nick,
      uid: m.uid,
      msg: m.msg,
      osType: m.osType,
      utime: m.utime,
    };
  });

  const content = { header: channel_data, body: messages_data };
  //   saveFile(content);
  console.log(content);
};

export { saveFile, flushBuffer };
