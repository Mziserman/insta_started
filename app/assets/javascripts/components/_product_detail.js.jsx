var ProductDetail = React.createClass({
	handleClick() {
		this.props.handleClick()
	},

	render() { 
		return (
			<div className={this.props.active ? 'show' : 'hide'}>
				<div className="row product_detail">
					<p className="site">{this.props.product.site}</p>
					<p className="price">{this.props.product.price}</p>
					<div className="img_container">
						<img src={this.props.product.picture} />
					</div>
					<div className="buy center-block" onClick={this.handleClick}>
						<i className="fa fa-shopping-cart" aria-hidden="true"></i>
					</div>
				</div>
			</div>
		) 
	}
})