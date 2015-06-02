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
		// request(this.data.api, (err, res) => {
		// 	this.data.song = res.body;
		// });
		this.trigger(this.data)
	},

	listenables: actions,

	onOpenAlbumModal(data){
		this.trigger({message: data});
		this.modalOpen = true;
		actions.getSongs(data);

	},

	onCloseAlbumModal(){
		this.trigger({message: "Something Triggered"});
		this.modalOpen = false;
	},

	onGetSongs(query){
		this.trigger({query})
		var queryBody = this.data.api + '?album=' + query;

		request(queryBody, (err, res) => {
			this.data.song = res.body;
			console.log(this.data.song);
		});
	},

	getInitialState(){
		return this.data
	}
});

module.exports = songStore;