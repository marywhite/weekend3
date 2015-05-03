/**
$.ajax({
    method: "GET",
    url: "location.html",
    success: function (){
        cityHtml = data;
        $("#more-stuff").empty(0;
        createCities();
    }
});

 AJAX helper/convenience methods:
 $.get -- get some resource
 $.getScript returns script
 $.getJSON gets JSON
 $.post put something somewhere
 $.load load in a file

 JSONP Javascript object notation with padding
 used to perform cross origin request WHICH server has to support
 complete -- runs regardless of success or error
 success

 dataType = 'jsonp',
 jsonp: 'json_callback'

 CORS
 Cross-origin resource sharing
xhr transfer protocol
 $.ajax {(
    type: 'GET',
    url: 'https://updates.html5rocks.com',
    crossDomain: true,
    dataType: 'text',
    success: function(response){
        console.log(response)
    },
    error: function(xhr, status){
        alert('Error: ' + status)
    }

 )}

 postman -- rest app
 $(".kittenLink").attr("href", "http://placekitten.com/320/210");
 $(".kittens").text("Click here to view kitten lalalala");
 $(".kittenDescription").text("wow such a cute kitten");
 $(".kittenImg").attr("src", "http://placekitten.com/320/210");
 */


$(document).ready(function () {

    var query= 'shoegaze';
    var api_key = 'd43908568d7b06a5c4d049def66ff619';


    $.ajax({
        type: 'GET',
        url: 'http://ws.audioscrobbler.com/2.0?method=tag.getTopArtists&tag=' + query + '&api_key=d43908568d7b06a5c4d049def66ff619&format=json',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            console.log('Hello');
            console.log(data);
            //ourData = data;
            //username = data.login;
            //userPage = data.html_url;
            //userDescription = data.location;
            //userImage = data.avatar_url;

            //$('.username').text(username);
            //$('.userLinkUrl').attr('src', userPage);
            //$('.userLinkText').text(userPage);
            //$('.kittenDescription').text(userDescription);
            //$('.kittenImg').attr('src', userImage);
        },
        error: function (xhr, status) {
            alert('Error: ' + status);
        }

    });

});