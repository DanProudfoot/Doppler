var Reflux = require('reflux');

var actions = Reflux.createActions(
	[
	'openAlbumModal',
	'closeAlbumModal',
	'getSongs',
	'addToPlaylist',
	'playThis',
	'play',
	'pause',
	'fwd',
	'prev',
	'songLoaded',
	'songEnded',
	'readyPlay',
	'playAlbumFromHere',
	'clearSound',
	'updatePlayer',
	'updateTime'
	]
)

module.exports = actions;