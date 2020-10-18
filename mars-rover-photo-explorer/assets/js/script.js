$( "#RoverForm" ).validate({
 
});

// When a rover is selected, update the photo date with the first day  of the mission. Hint: use the onchange event on each radio button (HTML), then set the value of the picture date based on which button was pressed.
function FirstDate() {
	if (document.getElementById("Curiosity").checked) {
		document.getElementById("PictureDate").value = "2012-08-06"
	}
	if (document.getElementById("Opportunity").checked) {
		document.getElementById("PictureDate").value = "2004-01-26"
	}
	if (document.getElementById("Spirit").checked) {
		document.getElementById("PictureDate").value = "2004-01-05"
	}
}

function Search() {
    if ($( "#RoverForm" ).valid()) {


		if (document.getElementById("Curiosity").checked) {
        	rover = document.getElementById("Curiosity").value;
    	}
		if (document.getElementById("Opportunity").checked) {
        	rover = document.getElementById("Opportunity").value;
    	}
		if (document.getElementById("Spirit").checked) {
        	rover = document.getElementById("Spirit").value;
    	}

		picturedate = document.getElementById("PictureDate").value;
	
	// Make an AJAX call to the api.nasa.gov with the appropriate parameters to return the first 25 photos for that date.
		var myURL = "https://api.nasa.gov/mars-photos/api/v1/rovers/" + rover + "/photos?earth_date=" + picturedate + "&page=1&api_key=DEMO_KEY";

	
		var myMethod = "GET";

		
		$(document).ready(function() { 

			

			$.ajax({
			method: myMethod,
			url: myURL
			})

			// Display a thumbnail of the first 25 photos. Hint: In your HTML, create 25 invisible images. You will loop through the data and set the source of the photo to the URL of the photo in the database.

      // Display the number of photo found on that day. Hint: use the length property

      // You will also need to set the "tooltip" for the photo as the name of the camera for the photo.
			.done(function( msg ) {

				
				photolength = msg.photos.length;
				document.getElementById("SearchResults").innerHTML = photolength + " photos found"
				for (i = 0; i < 25; i++) {
					if (i < photolength) {
						document.getElementById("image" + i).src = msg.photos[i].img_src;
						document.getElementById("image" + i).title = msg.photos[i].camera.full_name;
						document.getElementById("fullimage" + i).href = msg.photos[i].img_src;
						document.getElementById("image" + i).style.display = "inline";
					}
				}
			});
		});

	}
}

// Create a Clear button to clear out any error messages.
function ClearForm() {
	document.getElementById("Curiosity").checked = false;
	document.getElementById("Opportunity").checked = false;
	document.getElementById("Spirit").checked = false;
	document.getElementById("RoverError").innerHTML = "";
	document.getElementById("PictureDate").value = "";
	document.getElementById("PictureDateError").innerHTML = "";
}
