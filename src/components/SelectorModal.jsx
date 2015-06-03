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
		return(
			<div className="testArea" >
				<h1>{this.state.message}</h1>
				<Table 
					className="table" 
					columns={['#','Track','Album','Duration']} 
					defaultSort={{column:'#', direction:'asc'}}
				>
					{this.state.song.map(song => {
						return(
							<Tr key="{song._id}" className="AlbumTable">
								<Td className="" column="#">{song.track}</Td>
								<Td className="" column="Track">{song.songTitle}</Td>
								<Td className="" column="Album">{song.album}</Td>
								<Td className="" column="Duration">{this.convertToHumanTime(song.duration)}</Td>
							</Tr>
						)
					})}
				</Table>

			</div>
		)
	}
});

module.exports = SelectorModal;