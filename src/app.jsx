var React = require('react');
var Reflux = require('reflux');

var songStore = require('./stores/songStore.js');
var albumStore = require('./stores/albumStore.js');

var actions = require('./actions/actions.js')

var AlbumTile = require('./components/AlbumTile.jsx');
var SelectorModal = require('./components/SelectorModal.jsx');
var AudioPlayer = require('./components/audio-player/AudioPlayer.jsx');


var App = React.createClass({

	render(){
		return(<div>
			<AlbumTile />
			<SelectorModal />
			<AudioPlayer />
		</div>);
	}
});

React.render(<App/>, document.getElementById('main'));