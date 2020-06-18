/**************************************************************************
 *
 *                  MAKE BOT DRAGGABLE
 *
 **************************************************************************/

var dragItem, dragHandle;
var active = false;
var currentX;
var currentY;
var initialX;
var initialY;

function dragStart(e) {
  e.preventDefault();

  chrome.storage.local.get(["xOffset", "yOffset"], function (result) {
    var xOffset = result["xOffset"];
    var yOffset = result["yOffset"];
    if (e.type === "touchstart") {
      initialX = e.touches[0].clientX - xOffset;
      initialY = e.touches[0].clientY - yOffset;
    } else {
      initialX = e.clientX - xOffset;
      initialY = e.clientY - yOffset;
    }
  });

  if (e.target === dragHandle) {
    active = true;
  }
}

function dragEnd(e) {
  active = false;
}

function drag(e) {
  if (active) {
    if (e.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } else {
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;
    }

    chrome.storage.local.set({
      xOffset: currentX,
      yOffset: currentY,
    });

    setTranslate(currentX, currentY, dragItem);
  }
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}

function make_draggable(dragitem, draghandle) {
  dragItem = dragitem;
  dragHandle = draghandle;
  var body = document.getElementsByTagName("body")[0];

  if (!body) return;
  dragHandle.addEventListener("touchstart", dragStart, false);
  body.addEventListener("touchend", dragEnd, false);
  body.addEventListener("touchmove", drag, false);

  dragHandle.addEventListener("mousedown", dragStart, false);
  body.addEventListener("mouseup", dragEnd, false);
  body.addEventListener("mousemove", drag, false);
}
