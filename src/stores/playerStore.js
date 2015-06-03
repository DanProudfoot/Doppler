var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');

var actions = require('../actions/actions');

var playerStore = Reflux.createStore({

	data: {
		song: [],
		api:'http://46.101.0.118:3610/api/v1/Songs',
		isPlaying: false,
		isLoading: false,
		currentSongIndex: -1,
		volume: 0.5
	},


	listenables: actions,

	getInitialState(){
		return this.data
	}
});

module.exports = playerStore;