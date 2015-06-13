var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');

var actions = require('../actions/actions');
var playlistStore = require('./playlistStore');

var Howl = require('../howler').Howl;

// test to see how many hardware channels we can output to if it's 6 or larger, we can play a 5.1 audio stream!
if (Howler.ctx.destination.maxChannelCount >= 6) {
	Howler.ctx.destination.channelCount = 6;
}
// otherwise, let's down-mix to 2.0
else {
	Howler.ctx.destination.channelCount = 2;
}
Howler.ctx.destination.channelCountMode = "explicit";
Howler.ctx.destination.channelInterpretation = "discrete";

console.log(Howler.ctx.destination.maxChannelCount + " Channels Available"); // Log available output channels. Firefox just doesn't heed this.


var playerStore = Reflux.createStore({

	data: {
		api:'http://46.101.0.118:3610/api/v1/Songs',
		urlPath:"http://46.101.0.118:3610/",
		isPlaying: false,
		isLoading: false,
		volume: 0.5,
		isLoading: false,
		playingState: {
			songTitle: "",
			albumArtist: "",
			duration: "",
			albumArt: ""
		}
	},

	listenables: actions,

	mixins: [Reflux.connect(playlistStore)],

	// init(){
	// 	this.listenTo(playlistStore, this.onPlaylistStore);
	// },

	getInitialState(){
			return this.data
	},

	updatePlayer(){
		this.data.playingState.songTitle = this.list.playlist[this.list.playlistIndex].songTitle;
		this.data.playingState.albumArtist = this.list.playlist[this.list.playlistIndex].albumArtist;
	},

	onPlayThis(song){
		actions.clearSound();
		actions.addToPlaylist.bind(this, song)
		song.path = this.data.urlPath + song.path;
		this.data.isPlaying = true;
		actions.readyPlay();
	},

	onPlay(){
		if(!this.data.isPlaying){
			this.howler.play();
			this.data.isPlaying = true;
		}
	},

	onPause(){
		if(this.data.isPlaying){
			this.howler.pause();
			this.data.isPlaying = false;
		}
	},

	onFwd(){
		if (this.list.playlistIndex < this.list.playlist.length - 1) {
			this.list.playlistIndex ++;
			actions.clearSound();
			actions.readyPlay();
		};
	},

	onPrev(){
		if (this.list.playlistIndex > 0) {
			this.list.playlistIndex --;
			actions.clearSound();
			actions.readyPlay();
		};
	},

	onReadyPlay(){
		this.initSound(this.list.playlist[this.list.playlistIndex].path);
	},
	
	initSound(song){
		
		this.data.isLoading = true;
		this.howler = new Howl({
			src: song,
			volume: this.data.volume,
			onload: actions.songLoaded,
			onend: actions.songEnded,
			html5: true
		});
	},

	onSongLoaded(){
		console.log("Song loaded and ready to go!")
		if (this.data.isPlaying) {
			this.howler.play();
			this.data.isLoading = false;
		};
	},

	onClearSound(){
		if (this.howler){
			this.howler.stop();
			this.howler = null;
		}
	}

	
});

module.exports = playerStore;