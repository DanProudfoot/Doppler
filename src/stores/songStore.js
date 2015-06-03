var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');

var actions = require('../actions/actions');

var songStore = Reflux.createStore({

	data: {
		song: [],
		api:'http://46.101.0.118:3610/api/v1/Songs',
		modalOpen: false
	},

	listenables: actions,

	onOpenAlbumModal(data){
		this.trigger({message: data});
		this.modalOpen = true;
		actions.getSongs(data);
	},

	onGetSongs(query){
		//this.trigger({query});
		query = query.replace("&", "and");
		var queryBody = this.data.api + '?album=' + query;

		request(queryBody, (err, res) => {
			this.data.song = res.body;
			this.trigger(this.data)
		});
	},

	getInitialState(){
		return this.data
	}
});

module.exports = songStore;