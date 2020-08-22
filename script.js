function generator() {
  var chat = document.querySelector('#chat').value;
  var n = document.querySelector('#n').value;
  var result = "";
  for(var i = 0; i < n; i++) {
    result += chat;
  }
  document.querySelector('#output').innerText = result;
  navigator.clipboard.writeText(result);
}

document.addEventListener('DOMContentLoaded', function() {
  var convert = document.querySelector('#convert');
  convert.addEventListener("click", generator);
});