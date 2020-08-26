var chatInput = document.querySelector('.chat-input textarea');
chatInput.value = "testing...";
chatInput.dispatchEvent(new Event('input', { bubbles: true }));  
