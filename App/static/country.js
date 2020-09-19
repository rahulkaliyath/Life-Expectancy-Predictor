const inputField = document.querySelector('.chosen-value');
inputField.blur();
console.log("blurrrr");
const dropdown = document.querySelector('.value-list');
const dropdownArray = [... document.querySelectorAll('li')];
var button=document.getElementById('next_bt');
console.log(dropdownArray)


inputField.addEventListener('focus', () => {
  button.classList.add('close_button');
   inputField.placeholder = 'Type to filter';

   dropdown.classList.add('open');
   
   dropdownArray.forEach(dropdown => {
     dropdown.classList.remove('closed');
   });
});


dropdownArray.forEach(item => {
  item.addEventListener('click', (evt) => {
    inputField.value = item.textContent;
    console.log(item.textContent);
    dropdownArray.forEach(dropdown => {
      dropdown.classList.add('closed');
    });
     button.classList.remove('close_button');
  });
})


inputField.addEventListener('blur', () => {
   inputField.placeholder = 'Select country';
  dropdown.classList.remove('open');
  button.classList.remove('close_button');
});


let valueArray = [];
dropdownArray.forEach(item => {
  valueArray.push(item.textContent);
});

const closeDropdown = () => {
  dropdown.classList.remove('open');
}

inputField.addEventListener('input', () => {
  dropdown.classList.add('open');
  let inputValue = inputField.value.toLowerCase();
  let valueSubstring;
  if (inputValue.length > 0) {
    for (let j = 0; j < valueArray.length; j++) {
      if (!(inputValue.substring(0, inputValue.length) === valueArray[j].substring(0, inputValue.length).toLowerCase())) {
        dropdownArray[j].classList.add('closed');
      } else {
        dropdownArray[j].classList.remove('closed');
      }
    }
  } else {
    for (let i = 0; i < dropdownArray.length; i++) {
      dropdownArray[i].classList.remove('closed');
    }
  }
});

button.addEventListener("click",function()
{
  console.log(inputField.value);
});




$( function() {
        $( "#next_bt" ).click(function() {
        var check=inputField.value;
          console.log(check);
          send={'value':check}
          $.ajax({
              type: "POST",
              url:"http://127.0.0.1:5000/country",
              data: JSON.stringify(send),
              dataType: 'json'
          }).done(function(data) { 
            console.log(data,"RETURNED FROM SERVER");
            document.getElementById('predict').innerHTML=data['answer'];
          });

          // window.location.href = "height.html";
        });
        });



$(function() {
  var $overlay = $('.overlay'),
      $overlayTrigger = $('#next_bt'),
      $overlayClose = $('.overlay-close'),
      openClass = 'is-open';

  $overlayTrigger.on('click', function() {
    var num = ('0' + ($(this).index() + 1)).slice(-2);
    console.log(num);
    $('.overlay01').addClass(openClass);
    $overlayClose.addClass(openClass);
  });

  $overlayClose.on('click', function() {
    $overlayClose.removeClass(openClass);
    $overlay.removeClass(openClass);
  });
});