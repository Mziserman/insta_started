var ProductList = React.createClass({
	handleClick(product) {
		this.props.handleClick(product)
	},

	render() {
		var products = this.props.products.map((product) => {
			return (
				<div key={product.id} className="col-xs-6 product_card_container">
					<div
						className="product_card"
						onClick={this.handleClick.bind(this, product)} >
						<img src={product.picture} />	
						<div className="information_container">
							<p className="name">{product.name}</p>
							<div className="row">
								<p className="price col-xs-8">{product.price}</p>
								<p className="site col-xs-4">{product.site}</p>
							</div>
						</div>
					</div>
				</div>
			)
		})	
		return (
			<div className={this.props.active ? 'show' : 'hide'}>
				<div className="row looks_container">
					{products}
				</div>
			</div>
		) 
	}
})