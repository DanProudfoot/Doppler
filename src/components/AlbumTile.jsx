var React = require('react');
var addons = require('react/addons');
var Reflux = require('reflux');
var albumStore = require('../stores/albumStore.js');
var actions = require('../actions/actions.js')

var AlbumTile = React.createClass({
	
	mixins: [Reflux.connect(albumStore)],

	render() {
		return (<div className="cover_container flex row-5">
			{this.state.album.map(album => {
				var style = {
					backgroundImage: 'url(' + this.state.urlPath + album.artPath.replace(/ /g, "%20") + ')'
				};
				return(
					<div key={album._id} className="album album-dark" onClick={actions.openAlbumModal.bind(this, album.album)} onDoubleClick={actions.playAlbumFromHere.bind(this, album.album)}>
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

module.exports = AlbumTile;