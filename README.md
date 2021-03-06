# Chrome Bot

It is a chrome extension to provide interface of bot which can perform some tasks through commands. You can even add your commands and if it works we would be happy to include it :stuck_out_tongue:.

You can also drag the bot by clicking on it and may play with it even ( try dragging ).

## Installation

### Clone this repository in your computer.

It can be done as:-

1. Create an empty directory and change into that directory.
2. Enter the following code:

```
git init
git clone https://github.com/devanshusingla/ChromeBot.git
```

This will create a folder named **ChromeBot**.

### Install needed node modules.

Its server is built on top of nodejs. If you don't have node already installed, install it before following steps:

1. Change to **Chromebot/server**.
2. run `npm install`.

### Add it as extension in Chrome browser.

1. Open a Chrome window and select **settings > More tools > Extensions**. This will open the Extension's window.
2. Now turn on the **Developer Mode** through the toggle button present at top right of the window.
3. Three options would have appeared. Click the **Load unpacked** option.
4. Now change to the **ChromeBot** directory and select the extension folder and click on **Open** button.
5. This will create an extension named **ChromeBot**. Enable the extension if not enabled by default and an icon would appear in the Extension toolbar.

**Note:** _Bot will only open after entire page has been loaded._

**Note:** _Bot wouldn't open on the homepage of window, for eg:- google search page on starting chrome window._

## Usage

### Starting server

1. Open terminal and change to **ChromeBot/server**.
2. run command nodemon index.js/node index.js.

### Starting extension

In your open chrome window, simply click the icon of this extension and it will start the bot.

## Further

Plz check the [docs](https://github.com/devanshusingla/ChromeBot/tree/dev/docs) folder for more information.

## Authors

[Devanshu Singla](https://github.com/devanshusingla) and [Yatharth Goswami](https://github.com/yatharth0610).

## Contributors
