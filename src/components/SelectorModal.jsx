var React = require('react');
var Reflux = require('reflux');
var Reactable = require('reactable');
var Table = Reactable.Table;
var Tr = Reactable.Tr;
var Td = Reactable.Td;

var songStore = require('../stores/songStore.js');
var timeFormat = require('../mixins/timeFormatMixin.js')

var actions = require('../actions/actions.js')

var SelectorModal = React.createClass({

	mixins: [Reflux.connect(songStore), timeFormat],

	render(){
		var visibility = {
			visible: {
				visibility: "visible",
				opacity: '1'
			},
			hidden: {
				visibility: "hidden",
				opacity: "0"
			}
		};
		return(
			<div> 
				<div className="modalOverlay" style={this.state.modalOpen ? visibility.visible : visibility.hidden} onClick={actions.closeAlbumModal}/>	
				<div className="songModal" style={this.state.modalOpen ? visibility.visible : visibility.hidden}>
					<h1>{this.state.song[0] ? this.state.song[0].album : null}</h1>
					<Table 
						className="songsTable" 
						columns={['#','Track','Duration']} 
						defaultSort={{column:'#', direction:'asc'}}
					>
						{this.state.song.map(song => {
							return(
								<Tr key="{song._id}" className="tableRow" onDoubleClick={actions.playThis.bind(this, song)}>
									<Td className="tableCell" column="#">{song.track}</Td>
									<Td className="tableCell cellTitle" column="Track">{song.songTitle}</Td>
									<Td className="tableCell cellDuration" column="Duration">{this.convertToHumanTime(song.duration)}</Td>
								</Tr>
							)
						})}
					</Table>
				</div>
			</div>
			
		)
	}
});

module.exports = SelectorModal;