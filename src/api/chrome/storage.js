const save = (key, value) => {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [key]: value }, () => {
      resolve();
      //   console.log("Value is set to", key, value);
    });
  });
};

const read = (key) => {
  return new Promise((resolve) => {
    chrome.storage.local.get([key], (result) => {
      //   console.log("Value currently is", result[key]);
      resolve(result[key]);
    });
  });
};

export { save, read };
