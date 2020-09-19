
var output=document.getElementById("value");
var mode = document.getElementById("slider");
console.log(mode.value);
mode.addEventListener("input", showSliderValue, false);
function showSliderValue() {
  output.innerHTML = mode.value+" Kg";
}

$( function() {
				$( "#next_bt" ).click(function() {
				var check=mode.value;
					console.log(check);
					send={'value':check}
					$.ajax({
  						type: "POST",
  						url:"http://127.0.0.1:5000/weight",
  						data: JSON.stringify(send),
  						dataType: 'json'
					}).done(function(data) { 
						console.log(data,"RETURNED FROM SERVER");
						window.location.href = "height.html";
					});

					
				});
  			});