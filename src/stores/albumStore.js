var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');

var albumStore = Reflux.createStore({
	
	data: {
		album: [],
		api:'http://46.101.0.118:3610/api/v1/Albums',
		urlPath:"http://46.101.0.118:3610/"
	},

	init(){
		request(this.data.api, (err, res) => {
			this.data.album = res.body;
			this.trigger(this.data);
		})
	},

	getInitialState(){
		return this.data
	}
})

module.exports = albumStore;