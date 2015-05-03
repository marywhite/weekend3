
$(document).ready(function () {

    var username= 'marydecember_';
    var api_key = 'd43908568d7b06a5c4d049def66ff619';
    var track;
    var trackResults;
    var artist;


    $.ajax({
        type: 'GET',
        url: 'http://ws.audioscrobbler.com/2.0?method=user.getRecentTracks&user=' + encodeURI(username) + '&api_key=d43908568d7b06a5c4d049def66ff619&format=json',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            track = data.recenttracks.track[0].name;
            artist = data.recenttracks.track[0].artist['#text'];
            $('.recentTrack').text(data.recenttracks.track[0].name);
            $('.recentArtist').text(data.recenttracks.track[0].artist['#text']);
            $('.recentImg').attr('src', data.recenttracks.track[0].image[2]['#text']);
            $('.recentAlbum').text(data.recenttracks.track[0].album['#text']);

        },
        error: function (xhr, status) {
            alert('Error: ' + status);
        }
    });


    $('.recentImg').click(function() {
        $.ajax({
            type: 'GET',
            url: 'http://ws.audioscrobbler.com/2.0?method=track.getsimilar&artist=' + encodeURI(artist) + '&track=' + track + '&api_key=d43908568d7b06a5c4d049def66ff619&format=json',
            crossDomain: true,
            dataType: 'json',
            success: function (data) {
                console.log('Hello');
                console.log(data);

            },
            error: function (xhr, status) {
                alert('Error: ' + status);
            }
        });
    });

    //$.ajax({
    //    type: 'GET',
    //    url: 'http://ws.audioscrobbler.com/2.0?method=track.search&track=' + encodeURI(track) + '&api_key=d43908568d7b06a5c4d049def66ff619&format=json',
    //    crossDomain: true,
    //    dataType: 'json',
    //    success: function (data) {
    //        trackResults = data;
    //        console.log(trackResults);
    //        console.log(trackResults.results.trackmatches.track[0].name);
    //        console.log(trackResults.results.trackmatches.track[0].artist);
    //        console.log(trackResults.results.trackmatches.track[0].image[2]);
    //
    //        //$('.username').text(username);
    //        //$('.userLinkUrl').attr('src', userPage);
    //        //$('.userLinkText').text(userPage);
    //        //$('.kittenDescription').text(userDescription);
    //        //$('.kittenImg').attr('src', userImage);
    //    },
    //    error: function (xhr, status) {
    //        alert('Error: ' + status);
    //    }
    //
    //});

    //var current = $('.row').children().first();
    //
    //for (var i = 0; i < 4; i ++){
    //    current
    //}

    //$.ajax({
    //    type: 'GET',
    //    url: 'http://ws.audioscrobbler.com/2.0?method=artist.getsimilar&artist=' + encodeURI(artist) + '&api_key=d43908568d7b06a5c4d049def66ff619&format=json',
    //    crossDomain: true,
    //    dataType: 'json',
    //    success: function (data) {
    //        console.log('Hello');
    //        console.log(data);
    //        //ourData = data;
    //        //username = data.login;
    //        //userPage = data.html_url;
    //        //userDescription = data.location;
    //
    //        //userImage = data.avatar_url;
    //
    //        //$('.username').text(username);
    //        //$('.userLinkUrl').attr('src', userPage);
    //        //$('.userLinkText').text(userPage);
    //        //$('.kittenDescription').text(userDescription);
    //        //$('.kittenImg').attr('src', userImage);
    //    },
    //    error: function (xhr, status) {
    //        alert('Error: ' + status);
    //    }
    //
    //});

});