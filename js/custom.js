var url1 = "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=";
var url2 = "&prop=info&inprop=url&utf8=&format=json";
//var value = "Main%20Page";
var url;
var box = $('#jumbo2');
var textInput = $("input:text"); //retrieve input

//On load, focus on the input
$(document).ready(function() {
    $("#searchInput").focus();
});

//When button is pressed...
$("#search-button").click(function(event) {
    event.preventDefault(); // prevent default action

    $("#jumbo2").children('#result').empty(); //clear
    $('#search-block').css('display', 'none');


    var directInput = textInput.val(); //get value of input

    var input = directInput.replace(/[^a-zA-Z ]/g, ""); //remove every characters except alphanumerical and "_"
    //console.log("REGEX: " + input)
    var input2 = input.split(" "); //put input in an array
    console.log("input2: " + input2);

    //Function to Uppercase the first letter of a string

    function firstToUpper(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    //loop to lowercase entry and the uppercase every first letter of each word
    for (var i = 0; i < input2.length; i++) {
        input2[i] = input2[i].toLowerCase();
        input2[i] = firstToUpper(input2[i]);
    }

    //remove spaces in the array
    input3 = input2.filter(function(entry) {
        return entry.trim() != ''
    });
    //console.log("here" + input3);

    //add %20 between every items of the array
    var result = input3.join('%20')

    //concatenate the url
    url = url1 + result + url2;

    $("#jumbo2").css("display", "block")


    ajaxRequest(); //call to the ajax requests
})

//Ajax request
var ajaxRequest = function() {
    $.ajax({
        url: url,
        timeout: 4000,
        dataType: "jsonp",
        success: function(data) {
            var resultat = data.query.search;
            console.log(resultat);
            if (resultat == "") {
                box.append('<p>Sorry, no resultat was found</p>')
            } else {
                $.each(resultat, function(i, val) {
                    var title = val.title;
                    var url = title.replace(/ /g, "_");
                    //console.log(url);
                    //console.log("Result "+ i + ":" + val.title);
                    box.append('<a href="https://en.wikipedia.org/wiki/' + url + '" target="_blank"><p id="result"' + i + '" class="text-center result">' + val.title + '</p></a>');
                });
            }
        },

        error: function() {
            box.html("Sorry something happened");
        }
    });

}
