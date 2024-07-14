import * as auth from "./api/chzzk/auth.js";
import * as chat from "./api/chzzk/chat.js";

let result;
let cookie;
let channelId;

function generator() {
  let chat = document.getElementById("chat").value;
  let n = document.getElementById("n").value;
  result = "";
  for (let i = 0; i < n; i++) {
    result += chat;
  }

  document.getElementById("output").innerText = result;
  navigator.clipboard.writeText(result);
}

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

    // getAccessToken 호출
    cookie = await auth.getAccessToken();

    // 모든 비동기 작업이 완료된 후 로그 출력
    console.log("Channel ID:", channelId);
    console.log("Cookie:", cookie);
  } catch (error) {
    console.error("Error:", error);
  }

  // connectChatWs 호출
  chat
    .connectChatWs(channelId, cookie)
    .then(() => {
      console.log("Chat connected");
    })
    .catch((error) => {
      console.error("Chat error:", error);
    });
});
