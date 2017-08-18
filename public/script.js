console.log("Sanity Check: JS is working!");

$(document).ready(function(){

  getAllBooks()

  // POST for form
  $("#add-form").submit(function(event) {
    event.preventDefault()
    var title = $('.add-title').val()
    var author = $('.add-author').val()
    $.post("https://mutably.herokuapp.com/books", {title: title, author: author})
    refreshBookList()
  })

  // Delete
  $(this).on('click', '.delete-btn', function() {

  })

  // Edit
  $(this).on('click', '.edit-btn', function() {
    $(this).hide()
    $('.save-btn').show()

  })

  // Save
  $(this).on('click', '.save-btn', function() {
    $(this).hide()
    $('.edit-btn').show()
  })

})

// Clear form and re-fetch data
function refreshBookList() {
  $('.list-group-book').remove()
  getAllBooks()
  $('form').find("input[type=text], textarea").val("");
}

// When Edit button is clicked
function clickEditBtn() {
  var id = data._id
  $('.list-group-book').remove()
  getAllBooks()
  $('form').find("input[type=text], textarea").val("");
}

// GET all books
function getAllBooks() {
  $.get("https://mutably.herokuapp.com/books", function(data, status) {
    // console.log(data);
    var books = data.books
    for (var i = 0; i < books.length; i++) {
      $('.list-group').append(
        '<ul class="list-group-book book-'+books[i]._id+'">'
        +'<button class="btn edit-btn btn-primary btn-edit-' + books[i]._id + '">Edit</button>'
        +'<button class="btn save-btn btn-success btn-save-' + books[i]._id + '">Save</button>'
        +'<span class="book-'+books[i]._id+'">&nbsp' + books[i].title + '&nbsp</span>'
        // +'<span class="form-inline edit-form input-'+data.books[i]._id+'">&nbsp;<input class="form-control" value="'+data.books[i].title+'"/></span>'
        +'<button class="btn delete-btn btn-danger pull-right btn-delete-' + books[i]._id + '">Delete</button>'
        +'</ul>'
      )
      $('.save-btn').hide()
    }
  })
}
