var LikeButton = React.createClass({
	getInitialState:function(){
		return {liked: false};
	},
	handleClick:function(evnet){
		this.setState({liked:!this.state.liked});
	},
	render:function(){
		var text = this.state.liked?'like':'haven\'t liked';
		return(
			<p onCick = {this.handleClick}>
			You {text} this. Click to toggle.
			</p>
		);
	}
});
ReactDom.render(
	<LikeButton />
	document.getElementById('example')
	)