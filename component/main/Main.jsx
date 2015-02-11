var React = require( 'react' );

var Main = React.createClass( {
	displayName: 'Main',
	getInitialState: function () {
		return {
			peerId: '',
			otherId: ''
		};
	},
	componentDidMount: function () {
		var self = this;
		this.peer = new window.Peer( { key: '6rxcn8ohlknpnwmi' } );
		this.peer.on( 'open', function ( id ) {
			self.setState( {
				peerId: id
			} );
		} );
		this.peer.on( 'connection', function ( conn ) {
			self.conn = conn;
			self.conn.on( 'open', self._onOpen );
		} );
	},
	render: function() {
		return (
			<div>
				<h1>My ID is: { this.state.peerId }</h1>
				<input type="text" value={ this.state.otherId } onChange={ this._onChange }/>
				<button onClick={ this._onClick }>Connect</button>
			</div>
		);
	},
	_onChange: function ( event ) {
		this.setState( {
			otherId: event.target.value
		} );
	},
	_onClick: function () {
		var conn = this.peer.connect( this.state.otherId );
		if ( !this.conn ) this.conn = conn;
		this.conn.on( 'open', this._onOpen );
	},
	_onOpen: function () {
		var self = this;
		console.log("@@@open@@@");
		self.conn.on( 'data', function ( data ) {
			console.log("@Received:", data);
		} );

		setInterval( function () {
			self.conn.send( 'Hello!' );
		}, 1000 );
	}
} );

module.exports = Main;
