var React = require('react');
var Reflux = require('reflux');

var playerStore = require('../../stores/playerStore.js');

var actions = require('../../actions/actions.js');

var Howl = require('../../howler');


var AudioPlayer = React.createClass({

	mixins:[Reflux.connect(playerStore)],

	render(){
		return(
			<div className="audio_player flex">

				<div className="now_playing-title light-text flex">
					<span className="now_playing-song">Example</span>
					<span>&nbsp;-&nbsp;</span>
					<span className="now_playing-artist">Example Artist</span>
				</div>
				<div className="now_playing-time light-text flex">
					<span className="now_playing-elapsed">0:00</span>
					<span>&nbsp;/&nbsp;</span>
					<span className="now_playing-total">0:00</span>
				</div>
				<div className="controls flex">
					<span className="action-rwd icon icon-rwd" onClick={actions.prev}></span>
					<span className="action-play icon icon-play" onClick={actions.play}></span>
					<span className="action-pause icon icon-pause" onClick={actions.pause}></span>
					<span className="action-fwd icon icon-fwd" onClick={actions.fwd}></span>
				</div>
			</div>
		)
	}

});

module.exports = AudioPlayer;