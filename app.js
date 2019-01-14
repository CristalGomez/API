$(document).ready(function () {
  var startingGifs = ["corgi", "puppy", "bunny", "pig", "kitten"];

  function renderButtons(){
    $("#buttons-view").empty();

    for (var i = 0; i <startingGifs.length; i++){
      var newBtn = $("<button>");
      newBtn.addClass("gif");
      newBtn.attr("data-name", startingGifs[i]);
      newBtn.text(startingGifs[i]);
      $("#buttons-view").prepend(newBtn);
    }
  }
  renderButtons();

  $("#add-gif").on("click", function(event){
    event.preventDefault();
    var newGif = $("#gif-input").val().trim();
    var gifTopic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + //(host/endpoint/parameter)
    newGif + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response){
      var results = response.data;
      console.log(results);
      startingGifs.push(newGif);
      renderButtons();
    })
  })

  // ^^^ all that code does what I want it to do

  // vvv this is where I realized that those buttons are "button.gif"
  // I want to be able to click on that button &have it display the info
  // that's why I'm creating a displayGifInfo button
  //but earlier I realized that I have no idea why this doesnt work

  function displayGifInfo(){
    var buttonBtn = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + //(host/endpoint/parameter)
    person + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function(response){
      var results = response.data;
      for (var i = 0; i < results.length; i++){
        var gifDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var gifImage = $("<img>");
        gifImage.attr("src", results[i].images.fixed_height.url);
        gifDiv.prepend(p);
        gifDiv.prepend(gifImage);
      }
    })
  }

  //I get why this is here vvvv -- it makes sense
  // it's this displayGifInfo function where I think the code isn't connecting correctly


  $(document).on("click", "gif", displayGifInfo)
});