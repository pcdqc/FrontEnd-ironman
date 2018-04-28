;(function(){
  $.ajax({
    url: 'http://localhost:3001/articles',
    type: 'Get',
    success: (data) => {
      console.log(data)
    },
    error: (err) => {
      console.log(err)
    }
  })
}())