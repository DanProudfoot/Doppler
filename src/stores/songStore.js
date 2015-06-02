var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');

var actions = require('../actions/actions');

var songStore = Reflux.createStore({

	data: {
		song: [],
		api:'http://46.101.0.118:3610/api/v1/Songs'
	},

	init(){
		request(this.data.api, (err, res) => {
			this.data.song = res.body;
		});
	},

	listenables: actions,

	onOpenAlbum(){
		this.trigger({message: "Something Triggered"});
	},


	getInitialState(){
		return {message: "Initial State"};
	}
});

module.exports = songStore;