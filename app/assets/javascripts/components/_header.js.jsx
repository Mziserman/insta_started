var Header = React.createClass({

	handleBack() {
		this.props.handleBack();
	},
	render() { 
		return (
			<header>
				<h1>
				<span 
					className="back" 
					onClick={this.handleBack}> Back </span>{this.props.title}</h1>
			</header>
		) 
	}
})