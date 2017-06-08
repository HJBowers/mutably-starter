console.log("Sanity Check: JS is working!")

$(document).ready(function(){

  $("#getAllPokemon").on('click', function(data) {
    getAllPokemon(data)
  })

//Create new pokemon
  $(document).on('click', '.add-btn', function(data) {
    let id = $(this).data('id')
    $.ajax({
      method: 'POST',
      url: 'https://mutably.herokuapp.com/pokemon/',
      success: HandlePokeNameAddRes
    })
  })



//Delete a pokemon
  $(document).on('click', '.delete-btn', function(data) {
    let id = $(this).data('id')
    $.ajax({
      method: 'DELETE',
      url: 'https://mutably.herokuapp.com/pokemon/' +id,
      success: HandlePokeNameDeleteRes
    })
  })



//Update a pokemon
  $(document).on('click', '.save-btn', function(data) {
    let id = $(this).data('id')
    let updatedName = $('input-' + id + 'input').val()
    $.ajax({
      method: 'PUT',
      url: 'https://mutably.herokuapp.com/pokemon/' +id,
      data: {name: updatedName},
      success: HandlePokeNameUpdateRes
    })
  })


//Edit Button changes text to an input field AND changes edit button to save button
  $(document).on('click', '.edit-btn', function(data) {
      let id = $(this).data('id')
      $('.name-' + id).hide()
      $('.input-' + id).show()
      $('.edit-' + id).hide()
      $('.save-' +id).show()
  })
});


//Get all pokemon
function getAllPokemon() {
  $('list-group').html('')
  $.ajax({
    method: 'GET',
    url: 'https://mutably.herokuapp.com/pokemon'
  }).done(function(results) {
    console.log(results);
    for (var i = 0; i < results.pokemon.length; i++) {
      $('.list-group').append('<li class="list-group-item item-' + results.pokemon[i]._id + '">'
      +'<button class="edit-btn edit-' + results.pokemon[i]._id + '" data-id="' + results.pokemon[i]._id + '">Edit</button>'
      +'<button class="save-btn save-' + results.pokemon[i]._id + '" data-id="' + results.pokemon[i]._id + '">Save</button>'
      +'<span class="name-' + results.pokemon[i]._id + '">&nbsp' + results.pokemon[i].name + '&nbsp</span>'
      +'<span class="form-inline edit-form input-' + results.pokemon[i]._id + '">&nbsp<input class="form-control" value="' + results.pokemon[i].name + '"/></span>'
      +'<button class="delete-btn">Delete</button>'
      +'</li>')
    }
  })
}

function HandlePokeNameAddRes(data) {
  console.log(data)
  getAllPokemon()
}

function HandlePokeNameDeleteRes(data) {
  $('.item-' + data._id).remove
}

function HandlePokeNameUpdateRes(data) {
  let id = data._id
  $('.name-' + id).html('&nbsp;'+data.name)
  $('.name-' + id).show()
  $('.input-' + id).hide()
  $('.edit-' + id).show()
  $('.save-' +id).hide()
}
