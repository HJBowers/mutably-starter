console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  $('.show-books').on('click', function() {
    event.preventDefault()
    getAllBooks()
  })

  // GET for show all books
  function getAllBooks() {
    // $('ul .list-group-book').replaceAll('.list-group-book')
    $.get("https://mutably.herokuapp.com/books", function(data, status) {
      console.log(data);
      var books = data.books
      for (var i = 0; i < books.length; i++) {
        $('.list-group').append(
          '<ul class="list-group-book book-'+books[i]._id+'">'
          +'<button class="btn btn-primary btn-edit-' + books[i]._id + '">Edit</button>'
          +'<span class="book-'+books[i]._id+'">&nbsp' + books[i].title + '&nbsp</span>'
          +'<span class="form-inline edit-form input-'+data.books[i]._id+'">&nbsp;<input class="form-control" value="'+data.books[i].title+'"/></span>'
          +'<button class="btn btn-success pull-right btn-save-' + books[i]._id + '">Save</button>'
          +'<button class="btn btn-danger pull-right btn-delete-' + books[i]._id + '">Delete</button>'
          +'</ul>'
        )
      }
    })
  }



  // Form POST
  $('form').on('submit', function(event) {
    event.preventDefault()
    var title = $('.add-title').serialize();
    var author = $('.add-author').serialize();
    $.post("https://mutably.herokuapp.com/books",
    {
      title: title,
      author: author
    },
    function(data, status) {
      console.log("Book added!\nData Submitted::: ", data, "\nStatus::: ", status);
    })
  })
});
