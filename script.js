
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
                var child = $('.similar').children().first();
                var similarTrack;
                for (var i = 0; i < 4; i ++) {
                    similarTrack = data.similartracks.track[i]
                    child.find('.trackName').text(similarTrack.name);
                    child.find('.trackArtist').text(similarTrack.artist.name);
                    child.find('.trackImg').attr('src', similarTrack.image[2]["#text"]);
                    child = child.next();
                }

            },
            error: function (xhr, status) {
                alert('Error: ' + status);
            }
        });
    });



});