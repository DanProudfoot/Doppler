var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');

var songStore = require('./stores/songStore.js');

var App = React.createClass({

	render(){
		return(<div>
			<AlbumTile />
		</div>);
	}
});

var AlbumTile = React.createClass({
	
	mixins: [Reflux.connect(songStore)],

	componentDidMount(){
		this.urlPath = "http://46.101.0.118:3610/";
	},

	render() {
		return (<div className="cover_container flex row-5">
			{this.state.song.map(song => {
				return(
					<div className="album album-dark">
						<div className="album_image"><img src={this.urlPath + song.artPath} alt=""/></div>
						<div className="album_info">
							<div className="album_name">{song.songTitle}</div>
							<div className="album_artist">{song.albumArtist}</div>
						</div>
					</div>
				)
			})}
		</div>)
	}
});

React.render(<App/>, document.getElementById('main'));