const getChannelDetail = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const r = await fetch(
        `https://api.chzzk.naver.com/service/v3/channels/${id}/live-detail`
      );
      const result = await r.json();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export { getChannelDetail };
