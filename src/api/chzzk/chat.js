import * as middleware from "../message/message.js";
import * as storage from "../chrome/storage.js";

// 필요한 것 channelId -> url 에서 긁어 오면 됨
// uId = token -> 쿠키에서 긁어 오면 됨 or AccessToken 발급
const connectChatWs = (uid, channelId, accTkn) => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket("wss://kr-ss2.chat.naver.com/chat");
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          ver: "3",
          cmd: 100,
          svcid: "game",
          cid: channelId,
          bdy: {
            uid: uid,
            devType: 2001,
            accTkn: accTkn.accessToken,
            auth: uid === null ? "READ" : "SEND",
            libVer: "4.9.3",
            osVer: "macOS/10.15.7",
            devName: "Google Chrome/126.0.0.0",
            locale: "ko",
            timezone: "Asia/Seoul",
          },
          tid: 1,
        })
      );
    };

    ws.onmessage = (event) => {
      middleware.processData(event.data);
    };

    ws.onerror = (error) => {
      reject(error);
    };

    ws.onclose = () => {
      resolve();
    };
  });
};

export { connectChatWs };
