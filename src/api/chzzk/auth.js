const getAccessToken = (channelId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const r = await fetch(
        `https://comm-api.game.naver.com/nng_main/v1/chats/access-token?channelId=${channelId}&chatType=STREAMING`
      );
      const result = await r.json();
      resolve(result.content);
    } catch (error) {
      reject(error);
    }
  });
};

const getChzzkCookies = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
      if (chrome.runtime.lastError) {
        return reject(chrome.runtime.lastError);
      }

      let currentTab = tabs[0];
      let url = new URL(currentTab.url);

      try {
        const NID_AUT = await getCookie("NID_AUT", url.origin);
        const NID_SES = await getCookie("NID_SES", url.origin);

        resolve({ NID_AUT, NID_SES });
      } catch (error) {
        reject(error);
      }
    });
  });
};

const getCookie = (name, url) => {
  return new Promise((resolve, reject) => {
    chrome.cookies.get({ name, url }, (cookie) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
      } else if (cookie) {
        resolve(cookie.value);
      } else {
        reject(new Error(`Cookie ${name} not found`));
      }
    });
  });
};

export { getAccessToken, getChzzkCookies };
