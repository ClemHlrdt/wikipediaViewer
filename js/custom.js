var url1 = "https://en.wikipedia.org/w/api.php?action=query&titles=";
var url2 = "&prop=revisions&rvprop=content&format=json";
var value = "Main%20Page";

var textInput = $("input:text"); //retrieve input


//When button is pressed...
$("#search-button").click(function(event) {
  event.preventDefault();// prevent default action

  //Function to Uppercase the first letter of a string

  function firstToUpper(string){
        return string.charAt(0).toUpperCase() + string.slice(1);
  }


  var directInput = textInput.val(); //get value of input

  var input = directInput.replace(/[^a-zA-Z ]/g, ""); //remove every characters except alphanumerical and "_"
  //console.log("REGEX: " + input)
  var input2 = input.split(" "); //put input in an array
  //console.log("input2: " + input2);

  //loop to lowercase entry and the uppercase every first letter of each word
  for (var i = 0; i < input2.length; i++) {
    input2[i] = input2[i].toLowerCase();
    input2[i] = firstToUpper(input2[i]);
  }

  //console.log(input2);
  //remove spaces in the array
  input3 = input2.filter(function(entry) {
    return entry.trim() != ''
  });
  //console.log("here" + input3);

  //add %20 between every items of the array
  var result = input3.join('%20')
  //console.log(result);


  //concatenate the url
  var url = url1 + result + url2;
  console.log(url);
  $("#jumbo2").css("display", "block")

})
