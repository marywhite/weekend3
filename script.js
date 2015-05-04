var username= 'marydecember_';
var api_key = 'd43908568d7b06a5c4d049def66ff619';
var track;
var trackResults;
var artist;
var displayCount = 0;
var limit = 50;


$(document).ready(function () {

    //parallax effect on jumbotron
    var jumboHeight = $('.jumbotron').outerHeight();
    function jumboScroll(){
        var scroll = $(window).scrollTop();
        $('.bg').css('height', (jumboHeight-scroll) + 'px');
    }

    $(window).scroll(function(e){
        jumboScroll();
    });


// ajax function to get recent tracks
    $.ajax({
        type: 'GET',
        url: 'http://ws.audioscrobbler.com/2.0?method=user.getRecentTracks&user=' + encodeURI(username) + '&limit=' + limit + '&api_key=' + api_key + '&format=json',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            trackResults = data.recenttracks.track;
            display();
        },
        error: function (xhr, status) {
            alert('Error: ' + status);
        }
    });

    //display most recent track
    $('.list').click(function(){
        $('.go').addClass('hidden');
        $('.recent-track').removeClass('hidden');
        $('.explore').removeClass('hidden');
    });

    //cycle through recent tracks

    $('.prev').click(function(){
        displayCount--;
        display();
    });

   $('.next').click(function(){
       displayCount++;
       display();
   });

    //find similar tracks using current artist & track
    $('.explore').click(function() {
        $('.tryAgain').addClass('hidden');
        $.ajax({
            type: 'GET',
            url: 'http://ws.audioscrobbler.com/2.0?method=track.getsimilar&artist=' + encodeURI(artist) + '&track=' + track + '&api_key=d43908568d7b06a5c4d049def66ff619&format=json',
            crossDomain: true,
            dataType: 'json',
            success: function (data) {
                var child = $('.similar').children().first();

                //if object is an array (it has similar tracks), display them
                if( Object.prototype.toString.call( data.similartracks.track ) === '[object Array]' ) {

                    //only display similar tracks of different artists
                    var allSimilar = data.similartracks.track.filter(function(el){
                        return el.artist.name != artist;
                    });

                    $('.similar').removeClass('hidden');
                    var similarTrack;
                    for (var i = 0; i < 4; i++) {
                        similarTrack = allSimilar[i];
                        child.removeClass('hidden');
                        child.find('.trackName').text(similarTrack.name);
                        child.find('.trackArtist').text(similarTrack.artist.name);
                        child.find('.fmlink').attr('href', similarTrack.url);
                        child.find('.fmlink').children().attr('src', similarTrack.image[2]["#text"]);
                        child = child.next();
                    }
                } else {
                    //otherwise, display message to user & hide current similar tracks
                    $('.tryAgain').removeClass('hidden');
                    $('.similar').addClass('hidden');
                }
            },
            error: function (xhr, status) {
                alert('Error: ' + status);
            }
        });
    });

//display track as user navigates through array
    function display(){
        $('.lastPlayed').addClass('hidden');
        if (displayCount < 0){
            displayCount = trackResults.length - 1;
        }
        if (displayCount > trackResults.length-1) {
            displayCount = 0;
        }
        if (displayCount == 0){
            $('.lastPlayed').removeClass('hidden');
        }
        var currentTrack = trackResults[displayCount];
        track = currentTrack.name;
        artist = currentTrack.artist['#text'];
        $('.recentTrack').text(track);
        $('.recentArtist').text(artist);
        $('.recentLink').attr('href', currentTrack.url);
        $('.recentLink').children().attr('src', currentTrack.image[2]['#text']);
        $('.recentAlbum').text(currentTrack.album['#text']);
    }

});