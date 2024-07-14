import * as auth from "./api/chzzk/auth.js";
import * as chat from "./api/chzzk/chat.js";
import * as channel from "./api/chzzk/channel.js";
import * as storage from "./api/chrome/storage.js";
import * as file from "./api/file/file.js";

let result;

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
  let channelId;
  let uid;

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

    // uid 가져오기
    uid = await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      function: () => localStorage["userStatus.idhash"],
    });
    uid = uid[0].result;
    storage.save("uid", uid);

    const result = currentTab.url.split("/");
    channelId = result[result.length - 1];
    await storage.save("channel-id", channelId);

    // cookie 가져오기
    const cookie = await auth.getChzzkCookies();
    await storage.save("cookie", cookie);

    // 모든 비동기 작업이 완료된 후 로그 출력
    console.log("Channel ID:", channelId);
    console.log("Cookie:", cookie);
  } catch (error) {
    console.error("Error:", error);
  }

  // live detail 호출
  const liveDetail = await channel.getChannelDetail();

  // getAccessToken 호출
  const accessToken = await auth.getAccessToken(
    liveDetail.content.chatChannelId
  );

  console.log("Live Detail:", liveDetail);
  console.log("Access Token:", accessToken);

  // connectChatWs 호출
  chat
    .connectChatWs(uid, liveDetail.content.chatChannelId, accessToken)
    .then(() => {
      console.log("Chat connected");
    })
    .catch((error) => {
      console.error("Chat error:", error);
    });

  const intervalTime = 60000; // 60초
  const intervalId = setInterval(file.flushBuffer, intervalTime);
});
