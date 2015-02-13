var React = require( 'react' );

var FileForm = React.createClass( {
	displayName: 'FileForm',
	getInitialState: function () {
		return {
			dataUri: null
		};
	},
	componentWillMount: function () {},
	componentDidMount: function () {},
	shouldComponentUpdate: function () {
		return true;
	},
	componentWillUpdate: function ( nextProps, nextState ) {},
	componentDidUpdate: function ( prevProps, prevState ) {},
	componentWillUnmount: function () {},
	render: function () {
		return (
			<form className="component-file-form" onSubmit={ this._handleSubmit } encType="multipart/form-data">
				<input type="file" onChange={ this._handleFile } />
			</form>
		);
	},
	_handleSubmit: function ( event ) {
		event.preventDefault();
	},
	_handleFile: function ( event ) {
		var self = this;
		var reader = new FileReader();
		var file = event.target.files[ 0 ];
		console.log("@file:", file);

		reader.onload = function ( upload ) {
			self.setState( {
				data: {
					name: file.name,
					type: file.type,
					arrayBuffer: upload.target.result
				}
			} );
		};
		reader.readAsArrayBuffer( file );
	},
	getFile: function () {
		return this.state.data;
	}
} );

module.exports = FileForm;
