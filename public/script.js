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
  $(document).on('click', '.delete-btn', function() {
    var id = $(this).data('id')
    var url = "https://mutably.herokuapp.com/books/" + id

    confirm("Are you sure you want to permanently delete this book?")

    $(".book-" +id).remove()

    $.ajax({
      url: url,
      type: 'DELETE',
      success: console.log("Success delete for book ID: " +id),
      data: id
    })
  })

  // Edit
  $(document).on('click', '.edit-btn', function() {
    var id = $(this).data('id')

    $('.input-' +id).show()
    $('.book-title-' +id).hide()

    $('.btn-edit-' +id).hide()
    $('.btn-save-' +id).show()
  })

  // Save
  $(document).on('click', '.save-btn', function() {
    var id = $(this).data('id')
    var url = "https://mutably.herokuapp.com/books/" + id
    var updatedTitle = $('.input-'+id+' input').val()

    $('.input-' +id).hide()
    $('.book-title-' +id).replaceWith(updatedTitle)

    $('.btn-save-' +id).hide()
    $('.btn-edit-' +id).show()

    $.ajax({
      url: url,
      type: 'PUT',
      data: {title: updatedTitle}
    })
  })

})

// Clear form and re-fetch data
function refreshBookList() {
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
        +'<button class="btn edit-btn btn-primary btn-edit-' + books[i]._id + '" data-id="'+data.books[i]._id+'">Edit</button>'
        +'<button class="btn save-btn btn-success btn-save-' + books[i]._id + '" data-id="'+data.books[i]._id+'">Save</button>'
        +'<span class="book-title-'+books[i]._id+'" data-id="'+data.books[i]._id+'">&nbsp' + books[i].title + '&nbsp</span>'
        +'<span class="form-inline edit-form input-'+data.books[i]._id+'" data-id="'+data.books[i]._id+'">&nbsp;<input class="form-control" value="'+data.books[i].title+'"/></span>'
        +'<button class="btn delete-btn btn-danger pull-right btn-delete-' + books[i]._id + '" data-id="'+data.books[i]._id+'">Delete</button>'
        +'</ul>'
      )
      $('.input-'+books[i]._id).hide()
      $('.save-btn').hide()
    }
  })
}
