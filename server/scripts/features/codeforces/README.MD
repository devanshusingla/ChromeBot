# Usage
1. First of all put your template in the skeleton.cpp file in this folder. By default skeleton.cpp will be empty.
2. Go to the outer directory which contains the main server and run :
```
node index.js or nodemon index.js
```
3. Open the extension in the contest you want to be scraped and type cf on the input box to the bot.
```bash
# The bot will parse all the problems of the contest
# download their testcases
# create multiple directories taskA taskB taskC taskD taskE depending on the number of problems in contest
# each directory created will have 
#    in0.txt out0.txt 
#    in1.txt out1.txt and so on 
# which represent the testcases downloaded
# and finally you will get the tasks directory opened in vscode
```
# Saving the tasks :
1. By default the tasks will get saved inside ./server/scripts/features/codeforces/contests inside the folder "Codeforces_Round_<num>" where number represents the contest number.
A sample scraped round directory has already been provided alongside to take a look at how the rounds will be saved.
2. To change this location we have provided a test.json file which contains a key called "path". Change the value corresponding to this key and then these tasks will be saved to that particular directory inside the folder by the name "Codeforces_Round_<num>".

# Author 
[Yatharth Goswami](https://github.com/yatharth0610)
**Email** : yatharthgoswami15@gmail.com

