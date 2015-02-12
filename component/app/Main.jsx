var React = require( 'react' );
var Connect = require( './main/Connect.jsx' );

var Main = React.createClass( {
	displayName: 'Main',
	getInitialState: function () {
		return {
			myId: '',
			isConnected: false
		};
	},
	componentDidMount: function () {
		var self = this;
		this.peer = new window.Peer( { key: '6rxcn8ohlknpnwmi' } );
		this.peer.on( 'open', function ( id ) {
			self.setState( {
				myId: id
			} );
		} );
		this.peer.on( 'connection', function ( conn ) {
			self.conn = conn;
			self.conn.on( 'open', self._onOpen );
		} );
	},
	render: function() {
		return (
			<div className="component-main">
				<h1>My ID is: { this.state.myId }</h1>
				<Connect isConnected={ this.state.isConnected } onPushConnect={ this._onPushConnect } />
			</div>
		);
	},
	_onPushConnect: function ( otherId ) {
		this.conn = this.peer.connect( otherId );
		this.conn.on( 'open', this._onOpen );
	},
	_onOpen: function () {
		var self = this;
		this.setState( {
			isConnected: true
		} );
		this.conn.on( 'data', function ( data ) {
			console.log("@Received:", data);
		} );

		setInterval( function () {
			self.conn.send( 'Hello!' );
		}, Math.random() * 1000 );
	}
} );

module.exports = Main;
