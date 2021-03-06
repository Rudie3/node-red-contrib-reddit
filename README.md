node-red-contrib-reddit
=
Node-RED nodes for reddit (node-reddit)
=
A set of node-red nodes for interacting with reddit.

Combine with other nodes to make reddit bots, scrapers and other cool stuff.

---

Install:

```
  npm install node-red-contrib-reddit
```

---

Log in with your reddit credentials and the details of a reddit script type app which is associated with your account.

![login node](http://i.imgur.com/FguHRKn.png)

![login node edit dialog](http://i.imgur.com/ZjNitTq.png)

---

## Creating a script type app on reddit

To get the log in credentials, you have to make an app for the account you want to control.

<b>Step 1</b>

Go to [your apps page](http://www.reddit.com/prefs/apps) and create a new app with this button:

![make app a](http://i.imgur.com/mek2qkg.png)

<hr/>

<b>Step 2</b>

Set up your app and check the 'script' radio button. The redirect URI is required but unused, so make it anything you want. Click create app.

![make app b](http://i.imgur.com/ux43dQD.png)

<hr/>

<b>Step 3</b>

Fill in the details in the node edit dialog.

<b>'client ID'</b> is the string below <b>'personal use script'.</b>


![make app c](http://i.imgur.com/xDqC8LM.png)

If all of the details are correct, on recieving a message, the node will log in and send the original msg object it recieved.

Nodes which require authentication, such as the post to sub node, can now be used.

Note: The details in this example are not valid.

---

For examples and ideas see [crazy-codes.com/node-red-stuff](http://www.crazy-codes.com/node-red-stuff)
