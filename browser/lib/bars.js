var echo = '8351a46084a346d3afcd545340a58201';
var trackID = '4B0JvthVoAAuygILe3n4Bs';
var trackURL = '/audio/whatdoyoumean.mp3';

var remixer;
var player;
var track;
var remixed;
var bars = 'bars';
var beats = 'beats';

function addBar(index) {
    // var index = $("#indexBox").val();
    // makeRemix.push(track.analysis.bars[index]);
    // player.queue(track.analysis.bars[index])
    if(track.analysis.bars[index]) player.queue(track.analysis.bars[index]);
}

function playMakeRemix (reverse,type,matrixName){
    console.log(type);
    var makeRemix = [];
    player.stop();
    // console.log(matrix1.row);
    // for(var i=0; i < matrix1.row; i ++){
    //     for(var j=0; j < matrix1.col; j++){
    //         if(matrix1.matrix[j][i] === 1){
    //             makeRemix.push(track.analysis.bars[i + j]);
    //         }
    //     }
    //             console.log(makeRemix);
    // }
    // player.play(0,makeRemix);
    // makeRemix = [];
    for(var i=0; i < matrixName.row; i ++){
        for(var j=0; j < matrixName.col; j++){
            if(matrixName.matrix[j][i] === 1){
                makeRemix.push(track.analysis[type][(i * matrixName.col) + j]);
                // player.queue(track.analysis.bars[i + j]);
            }
        }
                console.log(makeRemix);
    }
    if(reverse === true) makeRemix = makeRemix.reverse();
    player.play(0, makeRemix);
    makeRemix = [];
}

function playMakeRemixBeats (reverse,matrixName){
    var makeRemix = [];
    player.stop();
    // console.log(matrix1.row);
    // for(var i=0; i < matrix1.row; i ++){
    //     for(var j=0; j < matrix1.col; j++){
    //         if(matrix1.matrix[j][i] === 1){
    //             makeRemix.push(track.analysis.bars[i + j]);
    //         }
    //     }
    //             console.log(makeRemix);
    // }
    // player.play(0,makeRemix);
    // makeRemix = [];
    for(var i=0; i < matrixName.row; i ++){
        for(var j=0; j < matrixName.col; j++){
            if(matrixName.matrix[j][i] === 1){
                makeRemix.push(track.analysis.beats[(i * matrixName.col) + j]);
                // player.queue(track.analysis.bars[i + j]);
            }
        }
                console.log(makeRemix);
    }
    if(reverse === true) makeRemix = makeRemix.reverse();
    player.play(0, makeRemix);
    makeRemix = [];
}

function clearMatrix (matrixName){
    for(var i=0; i < matrixName.row; i ++){
        for(var j=0; j < matrixName.col; j++){
            if(matrixName.matrix[j][i] === 1){
                matrixName.setCell(j,i,false);
            }
        }
    }
}

function addBeat(index) {
    if(track.analysis.beats[index]) player.queue(track.analysis.beats[index]);
}

function createBarsMatrix (remixed) {
    nx.add('matrix', {w: 500, h: 500, name: 'matrix1', parent: 'matrixContainer'});
    console.log(remixed.bars);
    matrix1.row = 10;
    matrix1.col = 11;
    matrix1.bpm = remixed.track.tempo;

    setInterval(matrix1.life, remixed.track.tempo);
    matrix1.on('*',function(data) {
        if(data.level === 0) return;
        addBar((data.row * matrix1.col) + data.col);

        // if (data.grid) {
        //     for (var i=0;i<data.grid.length;i++) {
        //         for (var j=0;j<data.grid[i].length;j++) {
        //             if (data.grid[i][j]) {
        //                 // synth.triggerAttackRelease((j+1)*(i+1)*33, .12);
        //                 addBar(i*j)
        //                 console.log('data.grid',data.grid[i][j]);
        //             }
        //         }
        //     }
        // }
    })
    console.log(matrix1);
    matrix1.init();
    $('.play1').hide();
    $('.sixteenBeatsBtns').hide();
    $('.sixteenBarsBtns').hide();
}

function createBeatsMatrix (remixed) {
    nx.add('matrix', {w: 750, h: 500, name: 'matrix2', parent: 'matrixContainer2'});
    console.log('makingBeatsMatrix',remixed.beats);
    matrix2.row = Math.ceil(remixed.beats.length / 25);
    matrix2.col = 25;
    matrix2.bpm = remixed.track.tempo;
    setInterval(matrix2.life, remixed.track.tempo);
    // matrix2.sequenceMode = 'random'
    // matrix2.sequence(matrix2.bpm);
    matrix2.on('*',function(data) {
        // if(data.level === 0) return;
        addBeat((data.row * matrix2.col) + data.col);
        // setInterval(matrix2.life, 500);
        // if (data.grid) {
        //     for (var i=0;i<data.grid.length;i++) {
        //         for (var j=0;j<data.grid[i].length;j++) {
        //             if (data.grid[i][j]) {
        //                 // synth.triggerAttackRelease((j+2)*(i+2)*33, .22);
        //                 addBeat((data.row * matrix2.col) + data.col);
        //                 console.log('data.grid',data.grid[i][j]);
        //             }
        //         }
        //     }
        // }
    })
    console.log(matrix2);
    matrix2.init();
    $('.play2').hide();
}

function createSixteenBarsMatrix (remixed) {
    nx.add('matrix', {w: 500, h: 500, name: 'matrix3', parent: 'matrixContainer3'});
    console.log(remixed.bars);
    matrix3.row = 10;
    matrix3.col = 11;
    matrix3.bpm = remixed.track.tempo;

    matrix3.on('*',function(data) {
        if(data.level === 0) return;
        addBar((data.row * matrix3.col) + data.col);

        // if (data.grid) {
        //     for (var i=0;i<data.grid.length;i++) {
        //         for (var j=0;j<data.grid[i].length;j++) {
        //             if (data.grid[i][j]) {
        //                 // synth.triggerAttackRelease((j+1)*(i+1)*33, .12);
        //                 addBar(i*j)
        //                 console.log('data.grid',data.grid[i][j]);
        //             }
        //         }
        //     }
        // }
    })
    console.log(matrix3);
    matrix3.init();
    $('.play3').hide();
    $('.sixteenBarsBtns').show();
}

function createSixteenBeatsMatrix (remixed) {
    nx.add('matrix', {w: 750, h: 500, name: 'matrix3', parent: 'matrixContainer3'});
    console.log(remixed.bars);
    matrix3.row = Math.ceil(remixed.beats.length / 25);
    matrix3.col = 25;
    matrix3.bpm = remixed.track.tempo;

    matrix3.on('*',function(data) {
        if(data.level === 0) return;
        addBeat((data.row * matrix3.col) + data.col);

        // if (data.grid) {
        //     for (var i=0;i<data.grid.length;i++) {
        //         for (var j=0;j<data.grid[i].length;j++) {
        //             if (data.grid[i][j]) {
        //                 // synth.triggerAttackRelease((j+1)*(i+1)*33, .12);
        //                 addBar(i*j)
        //                 console.log('data.grid',data.grid[i][j]);
        //             }
        //         }
        //     }
        // }
    })
    console.log(matrix3);
    matrix3.init();
    $('.play3').hide();
    $('.sixteenBeatsBtns').show();
}

function init() {


        var contextFunction = window.AudioContext || window.webkitAudioContext;
        if (contextFunction === undefined) {
            $("#info").text("Sorry, this app needs advanced web audio. Your browser doesn't"
                + " support it. Try the latest version of Chrome?");
        } else {
            var context = new contextFunction();
            remixer = createJRemixer(context, $, echo);
            player = remixer.getPlayer();
            $("#info").text("Loading analysis data...");

            var socket = io();
            socket.on('analysis', function (data) {
                console.log(data);
                console.log('hey');
                  
                trackAnalysis = data;
                remixer.remixTrackById(trackAnalysis, trackURL, function(t, percent) {
                    track = t;

                    $("#info").text(percent + "% of the track loaded");
                    if (percent == 100) {
                        $("#info").text(percent + "% of the track loaded, remixing...");
                    }

                    if (track.status == 'ok') {
                        // $("#bars").text("The track has " + track.analysis.bars.length + " bars");
                        // $("#beats").text("The track has " + track.analysis.beats.length + " beats");
                        $("#info").text("Analysis complete!");
                        remixed = track.analysis;
                        console.log(remixed)
                        createBarsMatrix(remixed);
                    //     createBeatsMatrix(remixed);
                    }
                });
            });
        };
}

numBeats = function numBeats(num,remixed){
    if(num === 0) return remixed;
    var newRemix = [];
    for (var i=0; i < track.analysis.beats.length; i++) {
                    if (i % num) {
                        newRemix.push(track.analysis.beats[i])
                    }
                }
    $("#info").text("Remix complete!");
    return newRemix;
}

go = function go(num) {
    player.stop();
    player.play(0, numBeats(num, remixed));
}