console.log("Sanity Check: JS is working!")

$(document).ready(function(){

  //Loads all pokemon on page
  $("#getAllPokemon").on('click', function(data) {
    getAllPokemon(data)
  })


  //Open New Pokemon form
  $(document).on('click', '.addNewPoke-btn', function(data) {
    $('#addPokeForm').show()
  })


  //Create new pokemon
  $('#addPokeForm').on('submit', function(event) {
    event.preventDefault()

    // let id = $(this).data('id')
    // let url = "https://img.pokemondb.net/artwork/"
    // let pokeName = $("#name").val().toLowerCase()
    // $("#image").val(url + pokeName + ".jpg")

    let newPokeData = $(this).serialize()
    console.log("newPokeData:::", newPokeData)
    $(this).trigger("reset")
    $.ajax({
      method: 'POST',
      url: 'https://mutably.herokuapp.com/pokemon/',
      data: newPokeData,
      success: newPokeDataResponse
    })
  })


  //Update a pokemon
  $(document).on('click', '.save-btn', function() {
    let id = $(this).data('id')
    let updatedName = $('.input-' + id + 'input').val()
    $.ajax({
      method: 'PUT',
      url: 'https://mutably.herokuapp.com/pokemon/' +id,
      data: {name: updatedName},
      success: HandlePokeNameUpdateRes
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



  //Edit Button changes text to an input field AND changes edit button to save button
  $(document).on('click', '.edit-btn', function(data) {
      let id = $(this).data('id')
      $('#name-' + id).hide()
      // $('.pokedex-' + id).hide()
      // $('.evolves_from-' + id).hide()
      $('.input-' + id).show()
      $('.edit-' + id).hide()
      $('.save-' +id).show()
  })
})


//Get all pokemon
function getAllPokemon() {
  $('list-group').html('')
  $.ajax({
    method: 'GET',
    url: 'https://mutably.herokuapp.com/pokemon'
  }).done(function(results) {
    console.log(results)
    for (var i = 0; i < results.pokemon.length; i++) {
      $('.list-group').append('<li class="list-group-item item-' + results.pokemon[i]._id + '" >'
      +'<img src=' + results.pokemon[i].image + '>'
      +'<p></p>'
      +'<button class="edit-btn edit-' + results.pokemon[i]._id + '" data-id="' + results.pokemon[i]._id + '" >Edit Name</button>'
      +'<p></p>'
      +'<span class="name-' + results.pokemon[i]._id + '" >' + "<strong>Pokémon Name: </strong>" + '<text id="name-' + results.pokemon[i]._id + '" >' + results.pokemon[i].name + '</text>' + '</span>'
      +'<span class="form-inline edit-form input-' + results.pokemon[i]._id + '" hidden>&nbsp<input class="form-control" value="' + results.pokemon[i].name + '"/></span>'
      +'<br></br>'
      +'<span class="pokedex-' + results.pokemon[i]._id + '" >' + "<strong>Pokédex Number: </strong>" + results.pokemon[i].pokedex +'</span>'
      // +'<span class="form-inline edit-form input-' + results.pokemon[i]._id + '" hidden>&nbsp<input class="form-control" value="' + results.pokemon[i].pokedex + '"/></span>'
      +'<br></br>'
      +'<span class="evolves_from-' + results.pokemon[i]._id + '" >' + "<strong>Evolves From: </strong>" + results.pokemon[i].evolves_from +'</span>'
      // +'<span class="form-inline edit-form input-' + results.pokemon[i]._id + '" hidden>&nbsp<input class="form-control" value="' + results.pokemon[i].evolves_from + '"/></span>'

      +'<br></br>'
      +'<button class="save-btn save-' + results.pokemon[i]._id + '" data-id="' + results.pokemon[i]._id + '" hidden>Save</button>'
      +'<p></p>'
      +'<button class="delete-btn" >Delete</button>'
      +'</li>')
    }
  })
}

function newPokeDataResponse(data) {
  console.log(data)
  $('#addPokeForm').hide()
  getAllPokemon()
}

function HandlePokeNameDeleteRes(data) {
  $('.item-' + data._id).remove
}

function HandlePokeNameUpdateRes(data) {
  let id = data._id
  // $('#name-' + id).html('&nbsp;'+data.name)
  // $('.pokedex-' + id).html('&nbsp;'+data.pokedex)
  // $('.evolves_from-' + id).html('&nbsp;'+data.evolves_from)

  $('#name-' + id).show()
  // $('.pokedex-' + id).show()
  // $('.evolves_from-' + id).show()
  $('.input-' + id).hide()
  $('.edit-' + id).show()
  $('.save-' +id).hide()
}
