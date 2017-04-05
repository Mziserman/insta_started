var Loader = React.createClass({
	render() {
		return (
			<div className={this.props.loading ? "show" : "hide"}>
				LOADING
			</div>
		)
	} 
		

})