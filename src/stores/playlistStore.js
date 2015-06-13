var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');

var actions = require('../actions/actions');

var playlistStore = Reflux.createStore({

	list: {
		playlist: [],
		playlistIndex: 0
	},

	onPlayThis(song){
		this.data.playlistIndex = this.data.playlist.push(song) - 1;
		//console.log(this.data.playlist[this.data.playlistIndex].path)
	},

	getInitialState(){
		return this.list;
	}

});

module.exports = playlistStore;