
var output=document.getElementById("value");
var mode = document.getElementById("slider");
var button=document.getElementById("next_bt");
feet=["5\'0\"","5\'1\"","5\'2\"","5\'3\"","5\'4\"","5\'5\"","5\'6\"","5\'7\"","5\'8\"","5\'9\"","5\'10\"","5\'11\"","6\'0\"","6\'1\"",
"6\'2\"","6\'3\"","6\'4\"","6\'5\"","6\'6\"","6\'7\"","6\'8\"","6\'9\"","6\'10\"","6\'11\"","7\'0\"","7\'1\"","7\'2\""];	


height_in_cm=[152.40,154.94,157.48,160.02,162.56,165.10,167.74,170.18,172.72,175.26,177.80,180.34,182.88,185.45,187.96,190.50,
193.04,195.58,198.12,200.66,203.20,205.74,208.28,210.82,213.36,215.90,218.44];
mode.addEventListener("input", showSliderValue, false);
function showSliderValue() {
  output.innerHTML = feet[mode.value];
  console.log(height_in_cm[mode.value]);
}

button.addEventListener("click",function(){
	console.log("clicked",$("#value").text());
});

$( function() {
				$( "#next_bt" ).click(function() {
				var check=height_in_cm[mode.value];
					console.log(check);
					send={'value':check}
					$.ajax({
  						type: "POST",
  						url:"http://127.0.0.1:5000/height",
  						data: JSON.stringify(send),
  						dataType: 'json'
					}).done(function(data) { 
						console.log(data,"RETURNED FROM SERVER");
						window.location.href = "country.html";
					});

					
				});
  			});
