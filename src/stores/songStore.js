var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');

var songStore = Reflux.createStore({
	
	data: {song: []},

	init(){
		request('http://46.101.0.118:3610/api/v1/Songs', (err, res) => {
			this.data.song = res.body;
			this.trigger(this.data);
		})
	},

	getInitialState(){
		return this.data
	}
})

module.exports = songStore;