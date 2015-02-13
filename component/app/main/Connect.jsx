var React = require( 'react' );

var Connect = React.createClass( {
	displayName: 'Connect',
	propTypes: {
		isConnected: React.PropTypes.bool.isRequired,
		onPushConnect: React.PropTypes.func.isRequired,
		otherId: React.PropTypes.string
	},
	getInitialState: function () {
		return {
			inputId: ''
		};
	},
	render: function () {
		return (
			<div className="component-connect">
				{ this.props.isConnected ? <h2>Other ID is: { this.props.otherId }</h2> : null }
				{ this.props.isConnected ? null : <input type="text" value={ this.state.inputId } onChange={ this._onChange } /> }
				{ this.props.isConnected ? null : <button onClick={ this._onClick }>Connect</button> }
			</div>
		);
	},
	_onChange: function ( event ) {
		this.setState( {
			inputId: event.target.value
		} );
	},
	_onClick: function () {
		this.props.onPushConnect( this.state.inputId );
	}
} );

module.exports = Connect;
