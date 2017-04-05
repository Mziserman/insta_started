var ProductDetail = React.createClass({
	handleClick(url) {
		this.props.handleClick(url)
	},

	render() { 
		return (
			<div className={this.props.active ? 'show' : 'hide'}>
				<div className="row product_detail_container">
					<div className="site_container">
						<p>{this.props.site}</p>
					</div>
				</div>
			</div>
		) 
	}
})