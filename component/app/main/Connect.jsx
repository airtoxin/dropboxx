var React = require( 'react' );

var Connect = React.createClass( {
	displayName: 'Connect',
	propTypes: {
		isConnected: React.PropTypes.bool.isRequired,
		onPushConnect: React.PropTypes.func.isRequired
	},
	getInitialState: function () {
		return {
			otherId: ''
		};
	},
	render: function () {
		return (
			<div className="component-connect">
				{ this.props.isConnected ? <h2>Other ID is: { this.state.otherId }</h2> : null }
				{ this.props.isConnected ? null : <input type="text" value={ this.state.otherId } onChange={ this._onChange } /> }
				{ this.props.isConnected ? null : <button onClick={ this._onClick }>Connect</button> }
			</div>
		);
	},
	_onChange: function ( event ) {
		this.setState( {
			otherId: event.target.value
		} );
	},
	_onClick: function () {
		this.props.onPushConnect( this.state.otherId );
	}
} );

module.exports = Connect;
