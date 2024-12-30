$(document).ready(function(){
    
    $.ajax({
        url: "https://pokeapi.co/api/v2/pokemon/ditto"
    }).done(function(data) {
        console.log(data)
    })
})