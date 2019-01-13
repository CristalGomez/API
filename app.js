
//this on click function will display the gifs/response data of the buttons already displayed on the page
$("button").on("click", function(){
  var startingGifs = $(this).attr("data-animal");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + //(host/endpoint/parameter)
  startingGifs + "&api_key=dc6zaTOxFJmzC&limit=10";

  $.ajax({
    url:queryURL,
    method: "GET"
  })
  .then(function(response){
    var results = response.data;
    console.log(results);

    for (var i = 0; i <results.length; i++){
      var gifDiv = $("<div>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var animalImage = $("<img>");
      animalImage.attr("src", results[i].images.fixed_height.url);
      gifDiv.prepend(p);
      gifDiv.prepend(animalImage);
      $("#gifs-view").prepend(gifDiv);
    }
  });

  var state =$(this).attr("data-state");
  if (state === "still"){
    state = "animated"
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", state);
  } else{
    state = "still";
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", state);
  }
});

function renderButtons() {
  $("#buttons-view").empty();
  for (var i = 0; i < startingGifs.length; i++) {
    var a = $("<button>");
    a.addClass("gif-btn");
    a.attr("data-name", startingGifs[i]);
    a.text(startingGifs[i]);
    $("#buttons-view").append(a);
  }
}
$("#add-gif").on("click", function(event) {
  event.preventDefault();
  var gif = $("#gif-input").val().trim();

  startingGifs.push(gif);
  renderButtons();
});

// function displayGifInfo() {
//   var gif = $(this).attr("data-name");
//   var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + //(host/endpoint/parameter)
//   person + "&api_key=dc6zaTOxFJmzC&limit=10";

//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function (response) {
//     var gifDiv = $("<div class='gif'>");
//     var rating = response;
//     var pOne = $("<p>").text("Rating: " + response);
//     gifDiv.append(pOne);

//     var released = response;
//     var pTwo = $("<p>").text("Released: " + response);
//     gifDiv.append(pTwo);

//     var plot = response;
//     var pThree = $("<p>").text("Plot: " + released);
//     gifDiv.append(pThree);

//     var imgURL = response;
//     var image = $("<img>").attr("src", imgURL);
//     gifDiv.append(image);

//     $("#gifs-view").prepend(gifDiv);
//   });
// }


// $(document).on("click", ".gif-btn", displayGifInfo);
// renderButtons();

$(".gif-btn").on("click", function(){
  var topic = $(this).attr("data-topic");

  var results = response.data;
  for (var i = 0; i <results.length; i++){
    var gifDiv = $("<div>");
    var rating = results[i].rating;
    var p = $("<p>").text("Rating: " + rating);
    var personImage = $("<img>");
    personImage.attr("src", results[i].image.fixed_height.url);
    gifDiv.prepend(p);
    gifDiv.prepend(personImage);
    $("#gifs-view").prepend(gifDiv)
  }
})


// create input box & submit button
//allow user to type in topic & it appends to page
//

