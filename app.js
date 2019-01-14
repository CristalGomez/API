$(document).ready(function () {
  $("button").on("click", function () {
    var startingGifs = $(this).attr("data-animal");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + //(host/endpoint/parameter)
      startingGifs + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var animalImage = $("<img>");
          animalImage.attr("src", results[i].images.fixed_height.url);
          gifDiv.prepend(p);
          gifDiv.prepend(animalImage);
          $("#gifs-view").prepend(gifDiv);
        }
      })
  });

  var newGif = []; //empty array - this is where the user will type in new gif topic

  function renderButtons(){
    $("#buttons-view").empty();
    for(var i = 0; i <newGif.length; i++){
      var newGifBtn = $("<button>");
      newGifBtn.addClass("gif");
      newGifBtn.attr("data-name", newGif[i]);
      newGifBtn.text(newGif[i]);
      $("#buttons-view").prepend(newGifBtn);
    }
  }

  $("#add-gif").on("click", function(event){
    event.preventDefault();
    var gif = $("#gif-input").val().trim();
    newGif.push(gif);
    renderButtons();
  })
  $(document).on("click", ".gif", )



});