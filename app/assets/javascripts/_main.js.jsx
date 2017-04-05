var Main = React.createClass({
	componentWillMount() {
		this.clarifai = new Clarifai.App(
			'tnR5Q_NUO1TAxbWc-JIefyHc3X5n6apgmPjd6Lt3',
			'kVv56U1eBkig-fnfS-K7BzlSCf0MDGSXXlrVWCPv'
		)
	},

	getInitialState() {
		return {
			title: 'Tous mes likes instagram',
			isFeedActive: true,
			isProductListActive: false,
			isProductDetailActive: false,
			loading: false,
			products: [],
			selectedProduct: {}
		};
	},

	getConceptsFromClarifaiResponse(response) {
		return response.outputs[0].data.concepts.filter((concept) => {
			return concept.value > 0.4
		})
	},

	getProducts(response) {
		products = this.getConceptsFromClarifaiResponse(response)
		$.ajax({
			url: '/api/v1/products/find.json',
			type: 'GET',
			data: { names: products.map((p) => {return p.name}) },

			success: (response) => {
				this.setState({ products: response })
			}
		})
		
	},



	goToProductList() {
		this.setState({ 
			title: "Les produits associés au look",
			isFeedActive: false,
			isProductDetailActive: false,
			isProductListActive: true
		})
	},

	goToProductDetail() {
		this.setState({ 
			isFeedActive: false,
			isProductListActive: false,
			isProductDetailActive: true
		})
	},

	handleFeedClick(url) {
		this.goToProductList()
		this.setState({ loading: true })
		this.clarifai.models.predict("adidas", url).then(
			function(response) {
				this.setState({ 
					loading: false
				})
				this.getProducts(response)
			}.bind(this),
			function(err) {

			}
		);
	},
	
	handleProductListClick(product) {
		this.goToProductDetail()
		this.setState({
			selectedProduct: product,
			title: product.name
		});
	},

	setHeader(title) {
		this.setState({ title: title })
	},

	render() {
		return (
			<div>
				<Loader loading={this.state.loading} />
				<Header title={this.state.title} />
				<Feed 
					looks={this.props.looks} 
					setHeader={this.setHeader} 
					handleClick={this.handleFeedClick}
					active={this.state.isFeedActive} />
				<ProductList
					products={this.state.products}
					active={this.state.isProductListActive}
					handleClick={this.handleProductListClick} />
				<ProductDetail
					product={this.state.selectedProduct}
					active={this.state.isProductDetailActive} />
			</div>
		) 
	}
})