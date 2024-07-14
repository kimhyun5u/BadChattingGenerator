// 필요한 것 channelId -> url 에서 긁어 오면 됨
// uId = token -> 쿠키에서 긁어 오면 됨 or AccessToken 발급
const connectChatWs = (channelId, accTkn) => {
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
            uid: "b774e9efbd622830d61102d928c37c26",
            devType: 2001,
            accTkn: accTkn.accessToken,
            auth: "SEND",
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
      const data = JSON.parse(event.data);
      let processedData = [];

      if (Array.isArray(data.bdy)) {
        data.bdy.forEach((b) => {
          const d = {
            msg: b.msg,
            uid: b.uid,
            utime: b.utime,
            osType: JSON.parse(b.extras).osType,
          };
          processedData.push(d);
        });
      }

      console.log("Message:", JSON.parse(event.data));
      console.log("Processed Message: ", processedData);
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
