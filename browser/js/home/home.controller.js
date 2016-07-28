app.controller('HomeCtrl', function ($scope, RemixFactory) {

    console.log('hey');

    var apiKey = '8351a46084a346d3afcd545340a58201';
    var trackID = '4B0JvthVoAAuygILe3n4Bs';
    var trackURL = '/audio/whatdoyoumean.mp3';

    // Set up the key variables
    var remixer;
    var player;
    var track;
    // var remixed;
    var newRemix;
    $scope.init = function init() {

        // Make sure the browser supports Web Audio.
        var contextFunction = window.AudioContext;
        if (window.contextFunction === undefined) {
            $("#info").text("Error");
        } else {
            
            // These set up the WebAudio playback environment, and create the remixer and player.
            var context = new contextFunction();
            remixer = RemixFactory.createJRemixer(context, $, apiKey);
            $scope.player = remixer.getPlayer();
            $("#info").text("Loading analysis data...");

            // The key line.  This prepares the track for remixing:  it gets
            // data from the Echo Nest analyze API and connects it with the audio file.
            // All the remixing takes place in the callback function.
            remixer.remixTrackById(trackID, trackURL, function(t, percent) {
                track = t;
                console.log(track);

                // Keep the user update with load times
                $("#info").text(percent + "% of the track loaded");
                if (percent == 100) {
                    $("#info").text(percent + "% of the track loaded, remixing...");
                }

                // Do the remixing!
                if (track.status == 'ok') {
                    // This array holds the chunks of audio that we're going to play back
                    // $scope.remixed remixed = new Array();

                    // // This loops over each beat in the track.
                    // // If the index of the beat is a multiple of four, we append the beat to the playback array.
                    // for (var i=0; i < track.analysis.beats.length; i++) {
                    //         remixed.push(track.analysis.beats[i])
                    // }
                    $scope.remixed = track.analysis.bars;
                    $scope.track = track;
                    $("#bars").text("The track has " + track.analysis.bars.length + " bars");
                    $("#beats").text("The track has " + track.analysis.beats.length + " beats");
                $   ("#info").text("Remix complete!");
                }
            });
        }
    }

    $scope.numBeats = function numBeats(num,remixed){
        if(num === 0) return remixed;
        var newRemix = [];
        for (var i=0; i < $scope.track.analysis.beats.length; i++) {
                        if (i % num) {
                            newRemix.push($scope.track.analysis.beats[i])
                        }
                    }
        $("#info").text("Remix complete!");
        return newRemix;
    }

    $scope.go = function go(num) {
        $scope.player.stop();
        $scope.player.play(0, $scope.numBeats(num,$scope.remixed));
    }

    // Run the main function once the page is loaded.
    window.onload = $scope.init();

});





