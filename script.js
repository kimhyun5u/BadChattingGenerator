let result;
function generator() {
  let chat = document.querySelector('#chat').value;
  let n = document.querySelector('#n').value;
  result = "";
  for(let i = 0; i < n; i++) {
    result += chat;
  }
  document.querySelector('#output').innerText = result;
  navigator.clipboard.writeText(result);
  chrome.tabs.executeScript(
    {file: "chat.js"  
  });
}


document.addEventListener('DOMContentLoaded', function() {
  var convert = document.querySelector('#convert');
  convert.addEventListener("click", generator);
});
