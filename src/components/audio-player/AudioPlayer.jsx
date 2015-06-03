var React = require('react');
var Reflux = require('reflux');


var playerStore = require('../../stores/playerStore.js');

var actions = require('../../actions/actions.js');

var AudioPlayer = React.createClass({

	mixins:[Reflux.connect(playerStore)],

	render(){
		return(
			<div>
				<h1> Test</h1>
			</div>
		)
	}

});

module.exports = AudioPlayer;