var React = require('react');
var Reflux = require('reflux');

var playerStore = require('../../stores/playerStore.js');

var actions = require('../../actions/actions.js');

var Howl = require('../../howler');

var timeFormat = require('../../mixins/timeFormatMixin.js');


var AudioPlayer = React.createClass({

	mixins:[Reflux.connect(playerStore), timeFormat],

	render(){
		var visibility = {
			visible: {
				display: "block",
			},
			hidden: {
				display: "none",
			}
		};
		return(
			<div className="audio_player flex">

				<div className="now_playing-title light-text flex">
					<span className="now_playing-song">{this.state.playingState.songTitle}</span>
					<span>&nbsp;-&nbsp;</span>
					<span className="now_playing-artist">{this.state.playingState.albumArtist}</span>
				</div>
				<div className="now_playing-time light-text flex">
					<span className="now_playing-elapsed">{this.convertToHumanTime(this.state.playingState.position)}</span>
					<span>&nbsp;/&nbsp;</span>
					<span className="now_playing-total">{this.convertToHumanTime(this.state.playingState.duration)}</span>
				</div>
				<div className="controls flex">
					<span className="action-rwd icon icon-rwd" onClick={actions.prev}></span>
					<span className="action-play icon icon-play" style={this.state.isPlaying ? visibility.hidden : visibility.visible} onClick={actions.play}></span>
					<span className="action-pause icon icon-pause" style={this.state.isPlaying ? visibility.visible : visibility.hidden} onClick={actions.pause}></span>
					<span className="action-fwd icon icon-fwd" onClick={actions.fwd}></span>
				</div>
			</div>
		)
	}
});

module.exports = AudioPlayer;