/***************************************
*     AUTHOR : Yatharth Goswami        *
*  Email : yatharthgoswami15@gmail.com *
*    Github Username : yatharth0610    *
****************************************/

function codeforces() {
  const url = featureURL + "codeforces/";
  chrome.runtime.sendMessage({message : "getUrl"}, (response) => {
    
    let xhr = new XMLHttpRequest();

    xhr.onload = () => {
      console.log(xhr.response);
      if (xhr.response === "success") {
        newChat({
          chatter : "bot",
          text : "Files saved successfully!",  
        })
      }
      else {
        newChat({
          chatter : "bot",
          text : "Oops, Error Encountered!",
        })
      }
    }; 
  
    xhr.open("POST", url + "cf-bot", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify({"contestUrl" : response.message}));  
  })

}
