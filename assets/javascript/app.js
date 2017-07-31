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
		"penquin", 
		"pot-bellied pig",
		"rabbit", 
		"racoon", 
		"shark", 
		"toucan", 
		"vulture", 
		"walrus", 
		"zebra"
		];
	//var giphyArray = [];


	function displayAnimalGiphys() {
		var animal = $(this).attr("data-name"); 
		var APIkey = "dc6zaTOxFJmzC&limit=10";
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10"

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

		       	giphyDiv.prepend(giphy); 
		       	
		       	//push img to giphyArrayXXX SKIP THIS STEP
		        //use a for loop to display STILL giphies to page
	      	    $("#animal-giphys").prepend(giphyDiv);
	       	} 


        })

        
	}

	//Create click event for animal button class (document on click, or more efficient version mark mentioned in class)
		//run displayAnimalGiphys function
	$(document).on("click", ".animal-button", displayAnimalGiphys);




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
		

	function renderButtons() {

		$("#animals-view").empty();

		for (var i = 0; i < animalsArray.length; i++) {

			var button = $("<button>"); 

			button.addClass("animal-button");
			button.attr("data-name", animalsArray[i]); 
			button.text(animalsArray[i]);

			$("#animals-view").append(button); 
		}
	}

	renderButtons();


	$("#submit-animal").on("click", function(event) {
		event.preventDefault();

		var newAnimal = $("#addAnimal").val().trim(); 
		
		animalsArray.push(newAnimal); 
		 
		renderButtons();

		$("#addAnimal").val(null);
		
	});	












});