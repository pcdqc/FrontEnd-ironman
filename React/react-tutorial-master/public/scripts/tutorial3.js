var CommentBox = React.createClass({
  render: function(){
    return (
        <div className="CommentBox">
          <h1>Comments</h1>
          <CommentList />
          <CommentForm />
        </div>
      );
  }
});
