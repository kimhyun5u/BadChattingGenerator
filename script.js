let result;
function generator() {
  let chat = document.getElementById('chat').value;
  let n = document.getElementById('n').value;
  result = "";
  for (let i = 0; i < n; i++) {
    result += chat;
  }

  document.getElementById('output').innerText = result;
  navigator.clipboard.writeText(result);
  chrome.tabs.executeScript(
    {
      file: "chat.js"
    });
}


document.addEventListener('DOMContentLoaded', function () {
  var convert = document.getElementById('convert');
  convert.addEventListener("click", generator);
});