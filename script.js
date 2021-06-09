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

function setAnalytics() {
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-XXXXXXXX-X']);
  _gaq.push(['_trackPageview']);

  (function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

};

setAnalytics();

function trackButton(e) {
  _gaq.push(['_trackEvent', e.target.id, 'clicked']);
};

var buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('click', trackButtonClick);
} 