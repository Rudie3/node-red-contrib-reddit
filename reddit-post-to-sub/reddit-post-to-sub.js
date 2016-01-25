module.exports = function(RED) {
	"use strict";

	var request = require('request');

	function RedditPostToSub(config) {
		RED.nodes.createNode(this,config);

		var node = this;

		node.status({});

		this.on('input', function(msg) {

			node.status({fill:"yellow",shape:"dot",text:"posting.."});

			if (typeof bearer_token === 'undefined') {
				node.status({fill:"red",shape:"dot",text:"post failed"});
				node.error("not logged");
				node.close();
			} else {

				var norm = config.nodeormsg;

				var uri_link_base = "https://oauth.reddit.com/api/submit?url=LINK&kind=link&sr=SUB&title=TITLE&r=SUB&api_type=json";
				var uri_self_base = "https://oauth.reddit.com/api/submit?text=TEXT&kind=self&sr=SUB&title=TITLE&r=SUB&api_type=json";

				if (norm == "msg") {
					if (msg.post) {
						var post_type = msg.post.post_type;
						if (post_type == "link") {
							var sub = msg.post.sub;
							var title = msg.post.title.replace(" ", "%20");
							var link = msg.post.link;
							var api_link = uri_link_base.replace("LINK", link).replace("SUB", sub).replace("TITLE", title).replace("r=SUB", "r="+sub);
						} else {
							var sub = msg.post.sub;
							var title = msg.post.title.replace(" ", "%20");
							var text = msg.post.text.replace(" ", "%20");
							var api_link = uri_self_base.replace("TEXT", text).replace("SUB", sub).replace("TITLE", title).replace("r=SUB", "r="+sub);
						}

					} else {
						node.status({fill:"red",shape:"dot",text:"post failed"});
						node.error("no msg.post object, post failed");
					}

				}

				if (norm == "node") {
					var post_type = config.post_type;
					if (post_type == 'link'){
						var sub = config.sub;
						var title = config.title.replace(" ", "%20");
						var link = config.link;
						var api_link = uri_link_base.replace("LINK", link).replace("SUB", sub).replace("TITLE", title).replace("r=SUB", "r="+sub);
					} else {
						var sub = config.sub;
						var title = config.title.replace(" ", "%20");
						var text = config.post.replace(" ", "%20");
						var api_link = uri_self_base.replace("TEXT", text).replace("SUB", sub).replace("TITLE", title).replace("r=SUB", "r="+sub);
					}
				}

				if (typeof api_link === 'undefined') {
					node.status({fill:"red",shape:"dot",text:"post failed"});
					
				} else {

					var headers = {
						'Authorization': "bearer "+bearer_token,
						'User-Agent': user_agent
					};
					request.post({ url: api_link, headers: headers }, function (error, response, body) {
						if (error) {
							node.status({fill:"red",shape:"dot",text:"post failed"});
							node.error("request error");
							node.error(error);
						} if (!error && response.statusCode == 200) {
							var jsonObject = JSON.parse(body);
							var elen = jsonObject.json.errors.length;
							if (elen > 0) {
								node.status({fill:"red",shape:"dot",text:"post failed"});
								node.error("API error");
								node.error(jsonObject.json.errors);
							}
							else {
								node.status({fill:"green",shape:"dot",text:"posted"});
							}
						} else {
							node.status({fill:"red",shape:"dot",text:"post failed"});
							node.error("other request error");
							node.error(response.statusCode);
						}
					});
				}

			};
		});

		this.on("close", function() {
            // Called when the node is shutdown - eg on redeploy.
            // Allows ports to be closed, connections dropped etc.
            // eg: node.client.disconnect();
        });

	}
	RED.nodes.registerType("reddit-post-to-sub",RedditPostToSub);
}