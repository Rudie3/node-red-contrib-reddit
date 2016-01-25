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

![login node](/home/michael/std/dev/node-red-stuff/my-nodes/node-reddit/img/nn-login.png)
![login node edit dialog](/home/michael/std/dev/node-red-stuff/my-nodes/node-reddit/img/n-login.png)

---

## Creating a reddit script type app

To get the appropriate credentials to log in, you have to make an app for the account you want to control.

<b>Step 1</b>
Go to [your apps page](http://www.reddit.com/prefs/apps) and create a new app with this button:

![make app a](/home/michael/std/dev/node-red-stuff/my-nodes/node-reddit/img/r-make-app-a.png)
<hr/>

<b>Step 2</b>
Set up your app and check the 'script' radio button. The redirect URI is required but unused, so make it anything you want. Click create app.

![make app b](/home/michael/std/dev/node-red-stuff/my-nodes/node-reddit/img/r-make-app-b.png)
<hr/>

<b>Step 3</b>
Fill in the details in the node edit dialog.

<b>'client ID'</b> is the string below <b>'personal use script'.</b>


![make app c](/home/michael/std/dev/node-red-stuff/my-nodes/node-reddit/img/r-make-app-c.png)

If all of the details are correct, on recieving a message, the node will log in and send the original msg object it recieved.

Nodes which require authentication, such as the post to sub node, can now be used.

Note: The details in this example are not valid.

---
