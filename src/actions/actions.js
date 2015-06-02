var Reflux = require('reflux');

var actions = Reflux.createActions(
	[
	'openAlbumModal',
	'closeAlbumModal',
	'getSongs'
	]
)

module.exports = actions;