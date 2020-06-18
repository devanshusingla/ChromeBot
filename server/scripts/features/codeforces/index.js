/***************************************
*     AUTHOR : Yatharth Goswami        *
*  Email : yatharthgoswami15@gmail.com *
*    Github Username : yatharth0610    *
****************************************/

const express = require("express");
const router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const execSync = require ("child_process").execSync;

router.post("/cf-bot", async (req, res) => {
  const url = req.body.contestUrl;
  console.log("CF-Bot activated");
  activateBot(url,res);
})

function activateBot(url, res) {
    axios.get(url)
    .then(response => {
        getTotalProblemsFromContestHtml(response.data, url, res);
    })
}

function getTotalProblemsFromContestHtml (html, url, res) {
  data = [];
  const $ = cheerio.load(html);
  let temp = JSON.parse(fs.readFileSync("./scripts/features/codeforces/test.json"));
  let path = temp[0].path;
  let contestNum = url.substring(url.lastIndexOf('/')+1);
  let dir = path + "/Codeforces_Round_" + contestNum;
  if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
  }
  $('tr td.id a').each((i, elem) => {
      problemurl = 'https://codeforces.com/' + $(elem).attr('href')
      getTestCaseFromProblemUrl(problemurl, contestNum);
  });
  setTimeout(function () {
      res.send("success");
      openVscode (path, contestNum);
  }, 6000);
}

function getTestCaseFromProblemUrl(url, num) {
  let data = JSON.parse(fs.readFileSync("./scripts/features/codeforces/test.json"));
  let path = data[0].path;
  let dir = path + "/Codeforces_Round_" + num + `/task${url.substring(url.lastIndexOf('/')+1)}`;
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  axios.get(url) 
  .then(response => {
     getTestCaseFromProblemHtml(dir, response.data);
  })
  .catch(err => console.log(err));
}

function getTestCaseFromProblemHtml (dir, html) {
  fs.copyFileSync(`./scripts/features/codeforces/skeleton.cpp`, `${dir}/sol.cpp`);
  data = []
  const $ = cheerio.load(html);
  $('div .input').each((i, element) => {
      data[i] = {
          ...data[i],
          input : $(element).find('pre').text(),
      };
  });
  $('div .output').each((i, element) => {
      data[i] = {
          ...data[i],
          output : $(element).find('pre').text(),
      };
  });
  let flag = 1;
  data.forEach((elem, i) => {
      fs.writeFile(`${dir}/in${i}.txt`, elem.input, function(err){
          if (err) {
              console.log(err);
              flag = 0;
          }
          else console.log(`${dir}/in${i}.txt was successfully saved`)
      });
      fs.writeFile(`${dir}/out${i}.txt`, elem.output, function(err){
          if (err) {
              console.log(err);
              flag = 0;
          }
          else console.log(`${dir}/out${i}.txt was successfully saved`)
      });
  })
}

function openVscode(path, num) {
    let dir = path + "/Codeforces_Round_" + num;
    execSync('cd ' + dir + "; code .", (err, stdout, stderr) => {
        if (err) {
            console.log(err);
        } else {
            console.log("Success!!");
        }
    })
}

module.exports = router;
