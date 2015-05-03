
$(document).ready(function () {

    var jumboHeight = $('.jumbotron').outerHeight();;
    function jumboScroll(){
        var scroll = $(window).scrollTop();
        console.log(jumboHeight, scroll, jumboHeight - scroll);
        $('.bg').css('height', (jumboHeight-scroll) + 'px');
    }

    $(window).scroll(function(e){
        jumboScroll();
    });

    var username= 'marydecember_';
    var api_key = 'd43908568d7b06a5c4d049def66ff619';
    var track;
    var trackResults;
    var artist;
    var displayCount = 0;
    var limit = 50;

// function to get recent tracks
    $.ajax({
        type: 'GET',
        url: 'http://ws.audioscrobbler.com/2.0?method=user.getRecentTracks&user=' + encodeURI(username) + '&limit=' + limit + '&api_key=d43908568d7b06a5c4d049def66ff619&format=json',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            console.log(data);
            trackResults = data.recenttracks.track;
            display();
        },
        error: function (xhr, status) {
            alert('Error: ' + status);
        }
    });

    $('.list').click(function(){
        $('.go').addClass('hidden');
        $('.recent-track').removeClass('hidden');
        $('.explore').removeClass('hidden');
    });

    $('.prev').click(function(){
        displayCount--;
        console.log('prev: ' + displayCount);
        display();
    });

   $('.next').click(function(){
       displayCount++;
       display();
   });


    $('.explore').click(function() {
        $('.getSimilar').css('font-size', '4em');
        $.ajax({
            type: 'GET',
            url: 'http://ws.audioscrobbler.com/2.0?method=track.getsimilar&artist=' + encodeURI(artist) + '&track=' + track + '&api_key=d43908568d7b06a5c4d049def66ff619&format=json',
            crossDomain: true,
            dataType: 'json',
            success: function (data) {
                var child = $('.similar').children().first();
                var similarTrack;
                console.log(similarTrack);
                for (var i = 0; i < 4; i ++) {
                    similarTrack = data.similartracks.track[i]
                    child.removeClass('hidden');
                    child.find('.trackName').text(similarTrack.name);
                    child.find('.trackArtist').text(similarTrack.artist.name);
                    child.find('.fmlink').attr('href', similarTrack.url);
                    child.find('.fmlink').children().attr('src', similarTrack.image[2]["#text"]);
                    child = child.next();
                }
            },
            error: function (xhr, status) {
                alert('Error: ' + status);
            }
        });
    });

    function display(){
        if (displayCount < 0){
            displayCount = trackResults.length - 1;
        }
        if (displayCount > trackResults.length) {
            displayCount = 0;
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