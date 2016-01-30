module.exports = function(RED) {
	"use strict";

	var request = require('request');

	function RedditGetRandSub(config) {
		RED.nodes.createNode(this,config);

		var node = this;
		var msg = msg;

		this.on('input', function(msg) {

			request.get({url: 'http://www.reddit.com/r/random'}, function (error, response, body) {
				if (error) {
					node.status({fill:"red",shape:"dot",text:"post failed"});
					node.error("request error");
					node.error(error);
				} if (!error && response.statusCode == 200) {
					msg.randsub = response.request.uri.href;
					node.send(msg);
				}
			});
		});
	}
	RED.nodes.registerType("reddit-get-random-sub",RedditGetRandSub);
}