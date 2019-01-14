$(document).ready(function () {
  var startingGifs = ["corgi", "puppy", "bunny", "pig", "kitten"]; // the buttons that initially show up on the page
  // the page does display gif information when one of these is clicked

  //the function that displays my var startingGifs
  function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < startingGifs.length; i++) {
      //setting the new buttons
      var newBtn = $("<button>");
      newBtn.addClass("gif");
      newBtn.attr("data-name", startingGifs[i]);
      newBtn.text(startingGifs[i]);
      $("#buttons-view").prepend(newBtn);
    }
  }
  renderButtons();


  //user adding a new button to the page
  //the API does not interact with these buttons
  $("#add-gif").on("click", function (event) {
    event.preventDefault();
    var newGif = $("#gif-input").val().trim();
    startingGifs.push(newGif);
    renderButtons();
    // This is where I was trying to add the API call so that the new buttons can get their information displayed
  })

  $("button").on("click", function (event) {
    event.preventDefault();
    var gifTopic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      gifTopic + "&api_key=dc6zaTOxFJmzC&limit=10";
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
          var p = $("<p>").text("Rating: " + rating.toUpperCase());
          var gifImage = $("<img>");
          gifImage.attr("src", response.data[i].images.fixed_height.url)
          gifDiv.prepend(p);
          gifDiv.prepend(gifImage);
          $("#gifs-view").prepend(gifDiv)
        }
        renderButtons();
      })
  })

//I made this function so that the gifInfo of each button is displayed
//This only works for one button clicked
//I actually don't think this function works at all
//the button onclick is what is displaying the info
  function displayGifInfo() {
    var gifTopic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      gifTopic + "&api_key=dc6zaTOxFJmzC&limit=10";
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        // this is displaying the info for each gif on the page
        //only 10 gifs at a time
        //only displaying the moving gif + the rating
        var results = response.data;
        console.log(results);
        for (var i = 0; i < results.length; i++) {
          var gifDiv = $("<div>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating.toUpperCase());
          var gifImage = $("<img>");
          gifImage.attr("src", response.data[i].images.fixed_height.url)
          gifDiv.prepend(p);
          gifDiv.prepend(gifImage);
          $("#gifs-view").prepend(gifDiv)
          // this is where I would make the images move/pause
          $(gifImage).on("click", function(){ // if the image is clicked on, then the if else condition will run
            var animatedGif = response.data[i].images.fixed_height.url; // referencing the animated gif from the response
            var stillGif = response.data[i].images.fixed_height.still.url; //referencing the still gif from the repsonse
            gifImage.attr("src", "still" = stillGif, "animated" = animatedGif) // defining what these states mean by referencing the variable which is referencing the information from the response
            //the if else statement that will determine if it has been clicked on, then it will either move or pause
            if (gifImage === "still"){
              gifImage = "animated"
            } else {
              gifImage = "still"
            }
          })

        }
        renderButtons();
      });
  }
  $(document).on("click", "gif", displayGifInfo) // I understand that this is what was supposed to display the info for the new buttons, but the displayGifInfo function doesn't work
});