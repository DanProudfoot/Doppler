var React = require('react');
var Reflux = require('reflux');
var request = require('superagent');

var songStore = require('./stores/songStore.js');
var albumStore = require('./stores/albumStore.js');

var actions = require('./actions/actions.js')

var globalData = {
	urlPath:"http://46.101.0.118:3610/"
}

var AlbumTile = React.createClass({
	
	mixins: [Reflux.connect(albumStore)],

	render() {
		return (<div className="cover_container flex row-5">
			{this.state.album.map(album => {
				var style = {
					backgroundImage: 'url(' + globalData.urlPath + album.artPath.replace(/ /g, "%20") + ')'
				};
				return(
					<div key={album._id} className="album album-dark" onClick={actions.openAlbum}>
						<div className="album_image" style={style}>
							<div className="album_info">
								<div className="album_artist" title={album.albumArtist}> {album.albumArtist} </div>
								<div className="album_name" title={album.album}> {album.album} </div>
							</div>
						</div>
					</div>
				)
			})}
		</div>)
	}
});

var SelectorModal = React.createClass({

	mixins: [Reflux.connect(songStore)],

	getInitialState(){
		return {modalOpen:false};
	}

	render(){
		return(
			<div className="testArea" >
				<h1>{this.state.message}</h1>
			</div>
		)
	}

})

var App = React.createClass({

	render(){
		return(<div>
			<AlbumTile />
			<SelectorModal />
		</div>);
	}
});

React.render(<App/>, document.getElementById('main'));