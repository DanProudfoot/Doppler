var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');

var actions = require('../actions/actions');

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
		playlist: [],
		playlistIndex: 0,
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

	getInitialState(){
			return this.data
	},

	update(){
		this.data.playingState.songTitle = this.data.playlist[this.data.playlistIndex].songTitle;
		this.data.playingState.albumArtist = this.data.playlist[this.data.playlistIndex].albumArtist;
	},

	onPlayThis(song){
		this.clearSound();
		song.path = this.data.urlPath + song.path;
		this.data.playlistIndex = this.data.playlist.push(song) - 1;
		//console.log(this.data.playlist[this.data.playlistIndex].path)
		this.data.isPlaying = true;
		actions.readyPlay();
	},

	onPlay(){
		if(!this.data.isPlaying){
			this.howler.play();
			this.data.isPlaying = true;
		}
	},

	onReadyPlay(){
		this.initSound(this.data.playlist[this.data.playlistIndex].path);
	},

	onPause(){
		if(this.data.isPlaying){
			this.howler.pause();
			this.data.isPlaying = false;
		}
	},

	onFwd(){
		if (this.data.playlistIndex < this.data.playlist.length - 1) {
			this.data.playlistIndex ++;
			this.clearSound();
			actions.readyPlay();
		};
	},

	onPrev(){
		if (this.data.playlistIndex > 0) {
			this.data.playlistIndex --;
			this.clearSound();
			actions.readyPlay();
		};
	},

	onSongLoaded(){
		console.log("Song loaded and ready to go!")
		if (this.data.isPlaying) {
			this.howler.play();
			this.data.isLoading = false;
		};
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

	clearSound(){
		if (this.howler){
			this.howler.stop();
			this.howler = null;
		}
	}

	
});

module.exports = playerStore;