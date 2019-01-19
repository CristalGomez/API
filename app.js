$(document).ready(function () {
  var startingGifs = []; // the buttons that initially show up on the page


  //displaying the Gif information for the new buttons added
  function displayNewGif() {
    console.log(this);
    var newGif = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newGif + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var results = response.data;
      console.log(results)
      //looping through the array of the new gif added
      for (var i = 0; i < results.length; i++) { //looping through 10 gifs
        var displayDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var displayImg = $("<img>");
        displayImg.attr("src", results[i].images.fixed_height.url);
        displayDiv.prepend(p);
        displayDiv.prepend(displayImg);
        $("#gifs-view").prepend(displayDiv);
        console.log(displayDiv);
      }
    })
  }

  //this is where the buttons are being placed on the page
  function displayBtns() {
    $("#buttons-view").empty(); //calling the HTML element
    for (var i = 0; i < startingGifs.length; i++) {
      var newBtns = $("<button>");
      newBtns.addClass("topicBtn"); //this class always for the function to listen to all buttons with a class of topicBtn
      newBtns.attr("data-topic", startingGifs[i]);
      newBtns.text(startingGifs[i]);
      $("#buttons-view").prepend(newBtns);
    }
  }

  //listening to the input from the HTML
  $("#add-gif").on("click", function (event) {
    event.preventDefault(); //when the user hits "add button" or clicks enter the page does not refresh
    var addGif = $("#gif-input").val().trim();
    startingGifs.push(addGif);//adding the new gif to the original array that is being called in the displayBtns function
    displayBtns();
  });

  //this event listener will call the API & display the information
  $(".topicBtn").on("click", function () {


    var gifTopic = $(this).attr("data-topic");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + gifTopic + "&api_key=dc6zaTOxFJmzC&limit=10";
    console.log(gifTopic);
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var displayDiv = $("<div>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var displayImg = $("<img>");
        displayImg.attr("src", results[i].images.fixed_height.url);
        displayDiv.prepend(p);
        displayDiv.prepend(displayImg);

        $("#gifs-view").prepend(displayDiv);
      }
    });

  })

  $("img").on("click", function () {

    var still = response.data[i].images.fixed_height_still.url
    var animated = response.data[i].images.fixed_height.url;
    // console.log(state)
    var state = $(this).attr("data-state")


    if (state === still) {
      state = animated

    } else if (state === animated) {
      state = still

    }
  })

  $(document).on("click", ".topicBtn", displayNewGif)


});