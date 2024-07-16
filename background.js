chrome.action.onClicked.addListener((tab) => {
  console.log("Extension icon clicked");

  // chrome:// 페이지가 아닌 경우에만 스크립트를 실행
  if (tab.url.startsWith("chrome://")) {
    console.error("Cannot execute script on chrome:// pages");
  } else {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        files: ["content.js"],
      },
      (results) => {
        if (chrome.runtime.lastError) {
          console.error("Error:", chrome.runtime.lastError.message);
        } else {
          console.log("Script executed successfully", results);
        }
      }
    );
  }
});
