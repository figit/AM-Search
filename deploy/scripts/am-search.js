document.addEventListener('DOMContentLoaded', function () {

	// Search
	$('input[type="submit"]').on("click", function(){

		// Clean existing results from dom
		$('.result').remove();

		// Check search input field
		if ($.trim($("input[type=text]", ".results").val()).length < 3) {
			$(".input-error-text", ".results").show();
			return false;
		} else {
			$(".input-error-text", ".results").hide();
		};
		
		// Fetch results
		$.ajax({
			url: "scripts/data.json",
			dataType: "json",
			success: function(json) {
				// Leaving loader in place for now, it's not applicable w/ current local loading
				$(".loader", ".results").hide();
				// Loop through results object
				$.each(json.results, function(key, value) {
					var resultItem = "<ul class='result'>";
					resultItem += "<li><h3><span>Name:</span> <a href='"+value.Producturl+"''>"+value.Name+"</a></h3></li>";
					resultItem += "<li><span>Price:</span> $"+value.Price+"</li>";
					resultItem += "<li><span>Manufacturer:</span> "+value.Manufacturer+"</li>";
					resultItem += "<li><span>SKU:</span> "+value.Sku+"</li>";
					// Opted for non-css based ellipse to support the more link just afterwards
					resultItem += "<li><span>Description:</span> "+value.Description.substring(0,300)+"... <a href='"+value.Producturl+"''>Click here for more information.</a></li>";
					resultItem += "</ul>";
					// Inject results
					$('.results').append(resultItem);
				});
			},
			error: function(e) {
				$('.loader').hide();
			}
		});
			
	});

});