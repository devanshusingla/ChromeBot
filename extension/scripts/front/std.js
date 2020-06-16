/****************************************************************
 *
 *               Basic Utility Functions
 *
 ****************************************************************/

let url = "http://localhost:3000/";
let chatURL = url + "chat/";
let featureURL = url + "feature/";

function setAttributes(element, list) {
  for (var key in list) {
    element.setAttribute(key, list[key]);
  }
}

function debugEvent(xhr, type) {
  function handleEvent(e) {
    console.log(`${type}:    ${e.type}: ${e.loaded} bytes transferred\n`);
  }

  xhr.addEventListener("loadstart", handleEvent);
  xhr.addEventListener("load", handleEvent);
  xhr.addEventListener("loadend", handleEvent);
  xhr.addEventListener("progress", handleEvent);
  xhr.addEventListener("error", handleEvent);
  xhr.addEventListener("abort", handleEvent);
}
