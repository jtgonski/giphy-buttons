$(document).ready(function() {
	var animalsArray = [
		"aardvark", 
		"antelope", 
		"baboon", 
		"bat", 
		"chinchilla",
		"capybara",
		"dolphin",
		"elephant", 
		"frog", 
		"goose", 
		"hedgehog", 
		"iguana", 
		"jaguar", 
		"kangaroo", 
		"lemur",
		"meerkat", 
		"narwhal", 
		"otter", 
		"owl", 
		"penguin", 
		"rabbit", 
		"racoon", 
		"shark", 
		"toucan", 
		"vulture", 
		"walrus", 
		"zebra"
		];
	
	function displayAnimalGiphys() {
		var animal = $(this).attr("data-name"); 
		var APIkey = "dc6zaTOxFJmzC&limit=10";
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=a3076eb2c5d54fb8b409e1799c4f8df5&limit=10"

        //clear previous giphys
        $("#animal-giphys").empty();

        //make AJAX call to retreive giphy information 
        $.ajax({
        	url: queryURL,
        	method: "GET"
        }).done(function(response) {
        	console.log(response);
        	console.log(response.data.length);
	       	//make a for loop for however many giphies you want to display
	       	var results = response.data; 

	       	for (var i = 0; i < results.length; i++) {
	       		var giphyDiv = $("<div>"); 
	       		giphyDiv.addClass("giphyDiv");

	       		//get rating 
	       		var rating = results[i].rating;

	       		var ratingDiv = $("<p>");
		  
		       	//create img tag to hold giphy
		       	var giphy = $("<img>")
		       	
		       	//asisgn src to still image URL
		       	giphy.attr("src", results[i].images.fixed_height_still.url); 
		       	
		       	//assign attr data-still to each img and set value to still image URL
		       	giphy.attr("data-still", results[i].images.fixed_height_still.url);

		       	//assign attr data-moving to each img and set value to moving image URL
		       	giphy.attr("data-moving", results[i].images.fixed_height.url);

		       	//assign attr data-state = still to eatch, this will let us know if its moving or not
		       	giphy.attr("data-state", "still"); 

		       	//assign class giphy to each
		       	giphy.addClass("giphy");

		       	ratingDiv.prepend("GIPHY rating: " + rating);
		       	giphyDiv.prepend(ratingDiv);

		       	giphyDiv.prepend(giphy); 
		       	
		        //use a for loop to display STILL giphies to page
	      	    $("#animal-giphys").prepend(giphyDiv);

	       	} 
        })        
	}

	//Create click event for animal button class (document on click, or more efficient version mark mentioned in class)
		//run displayAnimalGiphys function
	$(document).on("click", ".animal-button", displayAnimalGiphys);


		
	//append buttons into the animals view div
	function renderButtons() {
		//empty the animals view div
		$("#animals-view").empty();

		//check to see if there is an array in local storage
		//if so, set animalsArray to equal storage Array (parse it from the stringified version);
		if (localStorage.getItem("Animals-Array") !== null) {
			animalsArray = JSON.parse(localStorage.getItem("Animals-Array")); 
		}

		//display buttons to the animals view div
		for (var i = 0; i < animalsArray.length; i++) {

			var button = $("<button>"); 

			button.addClass("animal-button");
			button.attr("data-name", animalsArray[i]); 
			button.text(animalsArray[i]);

			$("#animals-view").append(button); 
		}		
	}

	renderButtons();

	//create click event to add new buttons and display to screen
	$("#submit-animal").on("click", function(event) {
		event.preventDefault();

		var newAnimal = $("#addAnimal").val().trim().toLowerCase();
		$("#addAnimal").val("");
		
		if (newAnimal === "") {
			alert("please enter an animal name")
		}
		else if ($.inArray(newAnimal, animalsArray) !== -1) {
			alert("that button already exists!");
		}
		else {
			animalsArray.push(newAnimal); 
		 
		}

		animalsArray.sort();

		//clear local storage
		localStorage.clear();

		//set local storage to animalsArray stringified
		localStorage.setItem("Animals-Array", JSON.stringify(animalsArray));

		renderButtons();

		
	});	

	//click event to remove the last button
	$("#remove-last-button").on("click", function(event) {
		event.preventDefault();

		var removeAnimal = $("#addAnimal").val().trim().toLowerCase();
		$("#addAnimal").val("");

		if (removeAnimal === "") {
			alert("Please enter which animal you would like removed"); 
		}
		else if ($.inArray(removeAnimal, animalsArray) === -1) {
			alert("That animal is not listed"); 
		}
		else {
			animalsArray.splice(animalsArray.indexOf(removeAnimal), 1);
		}

		//clear local storage
		localStorage.clear();

		//set local storage to animalsArray stringified
		localStorage.setItem("Animals-Array", JSON.stringify(animalsArray));

		renderButtons();
	})

	//click event to restore original buttons 
	$("#restore-buttons").on("click", function(event) {
		event.preventDefault(); 
		localStorage.clear(); 
		location.reload();
	})


	//create an a click event for giphy class 
	$(document).on("click", ".giphy", function() {
		
		//create a variable and save the giphy's data state to it
		var giphyState = $(this).attr("data-state");

		//if data state is equal to still, set data state to moving
		if (giphyState === "still") {

			//change the src attr to equal the data-moving attr
			$(this).attr("src", $(this).attr("data-moving"));
			$(this).attr("data-state", "moving"); 
		}
		//if data state is equal to moving, change data state to still
		else if (giphyState !== "still") {

			//change the src attr to equal the data-sitll attr
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still"); 
		}

	})


	//create hover event to activate giphys
	$(document).on("mouseenter mouseleave", ".giphy", function() {
		
		//create a variable and save the giphy's data state to it
		var giphyState = $(this).attr("data-state");

		//if data state is equal to still, set data state to moving
		if (giphyState === "still") {

			//change the src attr to equal the data-moving attr
			$(this).attr("src", $(this).attr("data-moving"));
			$(this).attr("data-state", "moving"); 
		}
		//if data state is equal to moving, change data state to still
		else if (giphyState !== "still") {

			//change the src attr to equal the data-sitll attr
			$(this).attr("src", $(this).attr("data-still"));
			$(this).attr("data-state", "still"); 
		}

	})




});