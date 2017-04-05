
var Feed = React.createClass({

	_getComponentClassName() {
		return this.props.active ? 'show' : 'hide';
	},

	handleClick(url) {
		this.props.handleClick(url)
	},

	render() { 
		this.props.looks.push("http://onpointfresh.com/wp-content/uploads/2016/04/adidas-stan-smith-12.jpg")
		var i = -1
		var looks = this.props.looks.map((look) => {
			i += 1
			return (
				<div 
					key={i} 
					className="col-xs-6 picture_container"
					onClick={this.handleClick.bind(this, look)} >
					<img src={look} />
				</div>
			)
		})
		return (
			<div className={this._getComponentClassName()}>
				<div className="row looks_container">
					{looks}
				</div>
			</div>
		) 
	}
})