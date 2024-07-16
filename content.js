console.log("content.js loaded");

function createPopup() {
  console.log("createPopup function called");

  // 기존 팝업이 있으면 제거
  const existingPopup = document.getElementById("custom-popup");
  if (existingPopup) {
    console.log("Existing popup found, removing it");
    existingPopup.remove();
  }

  // 팝업 생성
  const popup = document.createElement("div");
  popup.id = "custom-popup";
  popup.innerHTML = `
    <div class="popup-header" id="custom-popup-header">
      <span class="close-button">&times;</span>
      <h4>악질채팅생성기</h4>
    </div>
    <div class="popup-content">
      <label>반복할 채팅:</label>
      <input type="text" id="chat">
      <label>반복할 횟수:</label>
      <input type="number" value="1" id="n">
      <button id="convert">변환</button>
      <div id="output" style="word-break: break-all"></div>
    </div>
    <div class="resizer" id="resizer"></div>
  `;
  document.body.appendChild(popup);
  console.log("Popup created and appended to body");

  // 닫기 버튼 이벤트
  document.querySelector(".close-button").addEventListener("click", () => {
    console.log("Close button clicked");
    popup.remove();
  });

  // 변환 버튼 이벤트
  document.getElementById("convert").addEventListener("click", () => {
    console.log("Convert button clicked");
    const chat = document.getElementById("chat").value;
    const count = parseInt(document.getElementById("n").value, 10);
    const result = chat.repeat(count);
    document.getElementById("output").innerText = result;
    console.log("Result:", result);
  });

  // 드래그 앤 드롭 기능 추가
  dragElement(document.getElementById("custom-popup"));
  // 크기 조절 기능 추가
  resizableElement(document.getElementById("custom-popup"));
}

function dragElement(el) {
  const header = document.getElementById(el.id + "-header");
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (header) {
    // 헤더 영역이 있는 경우
    header.onmousedown = dragMouseDown;
  } else {
    // 헤더 영역이 없는 경우
    el.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // 마우스 포인터의 초기 위치를 얻습니다.
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // 마우스 커서가 이동할 때 호출되는 함수입니다.
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // 새로운 커서 위치를 계산합니다.
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // 요소의 새로운 위치를 설정합니다.
    el.style.top = el.offsetTop - pos2 + "px";
    el.style.left = el.offsetLeft - pos1 + "px";
  }

  function closeDragElement() {
    // 드래그를 멈춥니다.
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

function resizableElement(el) {
  const resizer = document.getElementById("resizer");
  let originalWidth,
    originalHeight,
    originalX,
    originalY,
    originalMouseX,
    originalMouseY;

  resizer.addEventListener("mousedown", function (e) {
    e.preventDefault();
    originalWidth = parseFloat(
      getComputedStyle(el, null).getPropertyValue("width").replace("px", "")
    );
    originalHeight = parseFloat(
      getComputedStyle(el, null).getPropertyValue("height").replace("px", "")
    );
    originalX = el.getBoundingClientRect().left;
    originalY = el.getBoundingClientRect().top;
    originalMouseX = e.pageX;
    originalMouseY = e.pageY;
    document.onmousemove = resizeElement;
    document.onmouseup = stopResize;
  });

  function resizeElement(e) {
    el.style.width = originalWidth + (e.pageX - originalMouseX) + "px";
    el.style.height = originalHeight + (e.pageY - originalMouseY) + "px";
  }

  function stopResize() {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}

// 팝업 생성
createPopup();
