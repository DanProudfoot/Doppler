var Reflux = require('reflux');

var actions = Reflux.createActions(
	[
	'openAlbumModal',
	'closeAlbumModal',
	'getSongs',
	'addToPlaylist',
	'playThis'
	]
)

module.exports = actions;