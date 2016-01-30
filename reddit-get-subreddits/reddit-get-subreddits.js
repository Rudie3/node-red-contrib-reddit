module.exports = function(RED) {
	"use strict";

	var request = require('request');

	function RedditGetSubreddits(config) {
		RED.nodes.createNode(this,config);

		var node = this;

		this.on('input', function(msg) {
			node.status({fill:"yellow",shape:"dot",text:"working.."});
			var keywords = config.keywords.split(' ').join('%20');
			var topicorname = config.topicorname;
			var headers = {
					'User-Agent': 'script: node-reddit-test by node-reddit'
				};
			if (topicorname === "topic") {
				node.log("topic option");
				var uri = "https://www.reddit.com/api/subreddits_by_topic.json?query="+keywords;
				request.get({url: uri, headers: headers}, function (error, response, body) {
					if (error) {
						node.status({fill:"red",shape:"dot",text:""});
						node.error("request error");
						node.error(error);
					} if (!error && response.statusCode == 200) {
						var jsonObject = JSON.parse(body);
						var names = [];
						var o;
						for (o in jsonObject) {
							names.push(jsonObject[o].name);
						}

						if (config.opts === "arr") {
							msg.allnames = names;
							node.send(msg);
						} else if (config.opts === "msgs") {
							var n;
							for (n in names) {
								msg = {};
								msg.name = names[n];
								node.send(msg);
							};
						} else {
							node.error("bad input values");
						};
					} else {
						node.status({fill:"red",shape:"dot",text:"error"});
					};
					node.status({});
				});
			} else if (topicorname === "name") {
				node.log("name option");
				var uri = "https://www.reddit.com/api/search_reddit_names.json?include_over_18=false&query="+keywords;
				request.post({url: uri, headers: headers}, function (error, response, body) {
					if (error) {
						node.error("request error");
						node.error(error);
					} if (!error && response.statusCode == 200) {
						var jsonObject = JSON.parse(body);
						var names = jsonObject.names;
						
						if (config.opts === "arr") {
							msg.allnames = names;
							node.send(msg);
						} else if (config.opts === "msgs") {
							var n;
							for (n in names) {
								msg = {};
								msg.name = names[n];
								node.send(msg);
							};
						} else {
							node.error("bad input values");
						};
					} else {
						node.status({fill:"red",shape:"dot",text:"error"});
					};
					node.status({});
				});
			} else {
				node.error("not configured");
				node.status({fill:"red",shape:"dot",text:"error"});
			};

		});
	}
	RED.nodes.registerType("reddit-get-subreddits",RedditGetSubreddits);
}