var CommentBox = React.createClass({
  render: function() {
    return (
        <div className="CommentBox">
          <h1>Comments</h1>
          <CommentList data={this.props.data} />
          <CommentForm />
        </div>
      );
  }
});
ReactDOM.render(
  <CommentBox data ={data},
  document.getElementById('content')
  );
