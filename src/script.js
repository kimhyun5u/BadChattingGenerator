import * as auth from "./api/chzzk/auth.js";
import * as chat from "./api/chzzk/chat.js";
import * as channel from "./api/chzzk/channel.js";

let result;
let cookie;
let channelId;
let liveDetail;
let accessToken;

const generator = () => {
  let chat = document.getElementById("chat").value;
  let n = document.getElementById("n").value;
  result = "";
  for (let i = 0; i < n; i++) {
    result += chat;
  }

  document.getElementById("output").innerText = result;
  navigator.clipboard.writeText(result);
};

document.addEventListener("DOMContentLoaded", async function () {
  var convert = document.getElementById("convert");
  convert.addEventListener("click", generator);

  try {
    // chrome.tabs.query를 Promise로 감싸기
    const tabs = await new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (chrome.runtime.lastError) {
          reject(chrome.runtime.lastError);
        } else {
          resolve(tabs);
        }
      });
    });

    let currentTab = tabs[0];
    const result = currentTab.url.split("/");
    channelId = result[result.length - 1];

    // cookie 가져오기
    cookie = await auth.getChzzkCookies();

    // 모든 비동기 작업이 완료된 후 로그 출력
    console.log("Channel ID:", channelId);
    console.log("Cookie:", cookie);
  } catch (error) {
    console.error("Error:", error);
  }

  // live detail 호출
  liveDetail = await channel.getChannelDetail(channelId);

  // getAccessToken 호출
  accessToken = await auth.getAccessToken(liveDetail.content.chatChannelId);

  console.log("Live Detail:", liveDetail);

  console.log("Access Token:", accessToken);

  // connectChatWs 호출
  chat
    .connectChatWs(liveDetail.content.chatChannelId, accessToken)
    .then(() => {
      console.log("Chat connected");
    })
    .catch((error) => {
      console.error("Chat error:", error);
    });
});
