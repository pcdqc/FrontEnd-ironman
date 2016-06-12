var Comment = React.createClass({
  render: function(){
    return (
        <div className = "comment">
          <h2 className="commentAuthor">
           {this.props.author}
          </h2>
          {this.props.children}
        </div>
      );
  }
});

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
          <Comment author={comment.author} key={comment.id}>
           {comment.text}
          </Comment>
        );
    });
    return (
      <div className = "commentList">
        {commentNodes}
      </div>
      );
  }
});
var CommentForm = React.createClass({
  getInitialState: function() {
    return {author:'',text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e){
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e){
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if(!text || !author){
      return ;
    }
    //TODO send request to the server
    this.props.onCommentSubmit({author:author,text:text});
    this.setState({author:'',text:''});
  },
  render: function(){
    return (
        <form className="commentForm" onSubmit={this.handleSubmit}>
          <input  type="text"
                  placeholder="Your name"
                  value={this.state.author}
                  onChange={this.handleAuthorChange}/>
          <input
            type="text"
            placeholder="Say Something..."
            value={this.state.text}
            onChange={this.handleTextChange}/>
          <input type="submit" value="Post"/>
        </form>
      );
  }
});

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url:this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data){
        console.log(data)
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    //TODO: submit to the server and refresh the list
    var comments = this.state.data;
    comment.id = Date.now();
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});
    $.ajax({
      url:this.props.url,
      dataType:'json',
      type:'POST',
      data:comment,
      success:function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr,status,err){
        this.setState({data: comments});
        console.error(this.props.url,status,err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
        <div className="CommentBox">
          <h1>Comments</h1>
          <CommentList data={this.state.data} />
          <CommentForm onCommentSubmit={this.handleCommentSubmit}/ >
        </div>
      );
  }
});


ReactDOM.render(
  <CommentBox  url="/api/comments" pollInterval={5000000000} />,
  document.getElementById('content')
  );
