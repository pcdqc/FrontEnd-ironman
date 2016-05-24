var ComentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
          <Coment author={comment.author} key={comment.id}>
           {coment.text}
          </Coment>
        );
    });
    return (
      <div className = "commentList">
        {commentNodes}
      </div>
      );
  }
});
