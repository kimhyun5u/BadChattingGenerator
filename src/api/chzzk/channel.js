import * as storage from "../chrome/storage.js";

const getChannelDetail = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const channelId = await storage.read("channel-id");
      const r = await fetch(
        `https://api.chzzk.naver.com/service/v3/channels/${channelId}/live-detail`
      );
      const result = await r.json();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export { getChannelDetail };
