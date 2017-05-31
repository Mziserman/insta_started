var Main = React.createClass({
	componentWillMount() {
		this.clarifai = new Clarifai.App(
			'tnR5Q_NUO1TAxbWc-JIefyHc3X5n6apgmPjd6Lt3',
			'kVv56U1eBkig-fnfS-K7BzlSCf0MDGSXXlrVWCPv'
		)
	},

	componentDidMount() {
		$.ajax({
			url: '/api/v1/users/find_basket.json',
			type: 'GET',
			data: { user_id: this.props.user_id },

			success: (response) => {
				this.setState({ basket: response })
			}
		})
		
	},

	getInitialState() {
		return {
			title: 'Tous mes likes instagram',
			isFeedActive: true,
			isProductListActive: false,
			isProductDetailActive: false,
			isBasketActive: false,
			loading: false,
			products: [],
			selectedProduct: {},
			history: ["FEED"],
			basket: [],
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

	goToProductList(back = false) {
		if (!back) {
			var history = this.state.history
			history.push("PRODUCT_LIST");
			this.setState({ history: history })
		} 
		this.setState({ 
			title: "Les produits associés au look",
			isBasketActive: false,
			isFeedActive: false,
			isProductDetailActive: false,
			isProductListActive: true,
		})
		
	},

	goToProductDetail(back = false) {
		if (!back) {
			var history = this.state.history;
			history.push("PRODUCT_DETAIL");
			this.setState({ history: history });
		} 
		console.log(this.state.history)
		this.setState({ 
			isFeedActive: false,
			isBasketActive: false,
			isProductListActive: false,
			isProductDetailActive: true
		})
	},

	goToFeed(back = false) {
		if (!back) {
			var history = this.state.history;
			history.push("FEED");
			this.setState({ history: history });
		} 
		this.setState({ 
			title: "Tous mes likes instagram",
			isBasketActive: false,
			isProductListActive: false,
			isProductDetailActive: false,
			isFeedActive: true,
		})
	},

	goToBasket(back = false) {
		if (!back) {
			var history = this.state.history;
			history.push("BASKET");
			this.setState({ history: history });
		}; 
		this.setState({ 
			title: "Mon panier",
			isProductListActive: false,
			isProductDetailActive: false,
			isFeedActive: false,
			isBasketActive: true,
		});
	},

	handleBack() {
		var history = this.state.history;
		var page = history.pop();
		switch(history[history.length - 1]) {
			case "FEED":
				this.goToFeed(true);
				break;
			case "PRODUCT_DETAIL":
				this.goToProductDetail(true);
				break;
			case "PRODUCT_LIST":
				this.goToProductList(true);
				break;
			case "BASKET":
				this.goToBasket(true);
				break;
			default:

		}
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
		this.goToProductDetail();
		this.setState({
			selectedProduct: product,
			title: product.name
		});
	},

	handleAddToCart() {
		this.setState({ loading: true })
		$.ajax({
			url: '/api/v1/users/add_to_cart.json',
			type: 'POST',
			data: {
				user_id: this.props.user_id, 
				product_id: this.state.selectedProduct.id
			},

			success: (response) => {
				this.setState({
					basket: response,
					loading: false
				});
				this.goToBasket();
			}
		})
		
	},

	render() {
		return (
			<div>
				<Loader loading={this.state.loading} />
				<Header 
					title={this.state.title} 
					handleBack={this.handleBack} />
				<Feed 
					looks={this.props.looks} 
					handleClick={this.handleFeedClick}
					active={this.state.isFeedActive} />
				<ProductList
					products={this.state.products}
					active={this.state.isProductListActive}
					handleClick={this.handleProductListClick} />
				<ProductDetail
					product={this.state.selectedProduct}
					handleClick={this.handleAddToCart}
					active={this.state.isProductDetailActive} />
				<Basket
					basket={this.state.basket}
					handleClick={this.handlePurchase}
					active={this.state.isBasketActive} />
			</div>
		) 
	}
})