var React = require( 'react' );
var Connect = require( './main/Connect.jsx' );
var FileForm = require( './main/FileForm.jsx' );

var Main = React.createClass( {
	displayName: 'Main',
	getInitialState: function () {
		return {
			myId: '',
			isConnected: false,
			url: '',
			name: '',
			otherId: ''
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
				<Connect
					isConnected={ this.state.isConnected }
					onPushConnect={ this._onPushConnect }
					otherId={ this.state.otherId }
				/>
				<FileForm ref="file" />
				<a href={ this.state.url } download={ this.state.name }>wefwef</a>
			</div>
		);
	},
	_onPushConnect: function ( otherId ) {
		var self = this;

		this.conn = this.peer.connect( otherId );
		this.conn.on( 'open', function () {
			self.setState( {
				otherId: otherId
			} );
			self._onOpen();
		} );
	},
	_onOpen: function () {
		var self = this;
		this.setState( {
			isConnected: true,
			otherId: this.conn.peer
		} );
		this.conn.on( 'data', function ( data ) {
			console.log("@data:", data);
			var blob = new Blob( [ data.arrayBuffer ], {
				type: data.type
			} );
			self.setState( {
				url: URL.createObjectURL( blob ),
				name: data.name
			} );
		} );

		this.conn.send( this.refs.file.getFile() );
	}
} );

module.exports = Main;
