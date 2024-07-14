// 필요한 것 channelId -> url 에서 긁어 오면 됨
// uId = token -> 쿠키에서 긁어 오면 됨 or AccessToken 발급
const connectChatWs = (channelId, cookie) => {
  return new Promise((resolve, reject) => {
    const ws = new WebSocket("wss://kr-ss2.chat.naver.com/chat");
    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          value: {
            channelId,
            uId: cookie.NID_AUT,
            token: cookie.NID_SES,
          },
        })
      );
    };

    ws.onmessage = (event) => {
      console.log("Message:", event.data);
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
