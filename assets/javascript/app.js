


    //Array of animals
    var animals = ["dog", "snake", "horse", "pig", "monkey", "zebra", "chicken", "turtle", "bear", "crab", "rabbit", "skunk" ];



    // Content for each button
    function displayAnimalInfo() {

        var animal = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

       // Ajax GET request
        $.ajax({
          url: queryURL,
          method: "GET"
        })

       // After data comes back from API
        .done(function(response) {
          var results = response.data;
          $("#animal-view").html(results);

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Image tag for the gifs
              var animalImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              animalImage.attr("src", results[i].images.fixed_height_still.url);
              animalImage.attr("data-still", results[i].images.fixed_height_still.url);
              animalImage.attr("data-animate", results[i].images.fixed_height.url);
              animalImage.attr("data-state", "still");
              animalImage.addClass("gif");
    
               
              // Appending the paragraph and animalImage we created to the "gifDiv" div
              gifDiv.append(p);
              gifDiv.append(animalImage);

              // Prepending the gifDiv to the "#animal-view" div in the HTML
              $("#animal-view").prepend(gifDiv);
            }
          }
  
          renderButtons();

        });
      }

      // Function for displaying animal data
      function renderButtons() {

        // Deleting the buttons prior to adding new movies
        $("#buttons-view").empty();

        // Looping through the array of animals
        for (var i = 0; i < animals.length; i++) {

          // Then dynamicaly generating buttons for each animal in the array
          var a = $("<button>");
      
          // Adding a class of animal to our button
          a.addClass("animal");
          // Adding a data-attribute
          a.attr("data-name", animals[i]);
          // Providing the initial button text
          a.text(animals[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

        // function for button clicked
      $("#find-animal").on("click", function(event) {
        event.preventDefault();

        // Grabs the input from the textbox 
        var animal = $("#animal-input").val().trim();

        // Adding an animal from the textbox to the array
        animals.push(animal);
        console.log(animals)

        // handles the processing of the animals array
        renderButtons();
      });

      // Function for displaying the animal info
      $(document).on("click", ".animal", displayAnimalInfo);

      // RenderButtons function to display the intial buttons
       renderButtons();
     

      // Fucntion to switch between still an animate images
      function stillToAnimate() {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    } 
    // function will display the different image states
      $(document).on("click", ".gif", stillToAnimate);





