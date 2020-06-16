function codeforces() {
  const url = featureURL + "codeforces/";

  let xhr = new XMLHttpRequest();

  xhr.onload = () => {
    console.log(xhr.response);
  };

  xhr.open("GET", url + "name", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send();
}
