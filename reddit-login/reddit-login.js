module.exports = function(RED) {
	"use strict";

	var request = require('request');
	var rawjs = require('raw.js');

	function RedditLoginNode(config) {
		RED.nodes.createNode(this,config);

		var node = this;

		if (typeof bearer_token != 'undefined') {
			node.status({fill:"green",shape:"dot",text:"logged in"});
		} else {
			node.status({});
		};

		this.on('input', function(msg) {
			
			node.status({fill:"yellow",shape:"dot",text:"logging in.."});

			var uname = config.uname;
			var upass = config.upass;
			var cid = config.cid;
			var secret = config.secret;
			var appname = config.app_name;
			var ua = 'script: APP by NAME'.replace("APP", appname).replace("NAME", uname).replace("bot", "");
			var headers = {
				'User-Agent': ua
			};
			global.user_agent = ua;

			var auth = {
				'username': cid,
				'password': secret,
				'sendImmediately': false
			};

			var reddit = new rawjs(ua);
			reddit.setupOAuth2(cid, secret);

			reddit.auth({"username": uname, "password": upass}, function(err, response) {
				if(err) {
					node.status({fill:"red",shape:"dot",text:"log in failed"});
					node.error(err);
				} else {
					node.status({fill:"green",shape:"dot",text:"logged in"});
					global.bearer_token = response.access_token;
					node.send(msg);
				}
			});
		});
	
	this.on("close", function() {
		// tidy up
    });

	}
	RED.nodes.registerType("reddit-login-node",RedditLoginNode);
}