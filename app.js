wavesurfer = Object.create(WaveSurfer);
audioTrack = new AudioTrack('demo.mp3');

function AudioTrack(nameOrUrl) {
    this.nameOrUrl = nameOrUrl;
}

function CueMarker() {
    this.startAt = wavesurfer.getCurrentTime();
    this.audioTrack = audioTrack.nameOrUrl;
    this.text = getText(this.startAt);

    function getText(startAt) {
        var text = '';
        text += Math.floor(startAt) + ' s ';
        text += Number(String(startAt % 1).split('.')[1] || 0) + ' ms';
        return text;
    }
}

CueMarker.findAll = function() {
    cuemarkers = store.getAll();
    console.log('Loading markers for song ' + audioTrack.nameOrUrl)
    for (var key in cuemarkers) {
        if (cuemarkers[key].audioTrack != audioTrack.nameOrUrl) {
            delete cuemarkers[key];
        }
    };
    return cuemarkers;
};

CueMarker.pop = function() {
    var allCueMarkers = store.getAll();
    var cueMarkerStartAt = Object.keys(allCueMarkers)[Object.keys(allCueMarkers).length - 1];
    var cueMarker = store.get(cueMarkerStartAt);
    store.remove(cueMarkerStartAt);
    console.log('Popped cuemarker');
    console.log(cueMarker);
};

CueMarker.remove = function(startAt) {
    var cueMarker = store.get(startAt)
    store.remove(startAt);
    console.log('Removed cuemarker');
    console.log(cueMarker);

};

CueMarker.add = function() {
    var cueMarker = new CueMarker();
    if (store.get(cueMarker.startAt)) {
        console.log('Warning: Cue marker already exists at that position');
    } else {
        store.set(cueMarker.startAt, cueMarker);
        console.log('Stored cuemarker');
        console.log(cueMarker);
    }
    return cueMarker;
};

CueMarker.getByPosition = function(position) {
    var allCueMarkers = store.getAll();
    var cueMarkerStartAt = Object.keys(allCueMarkers)[position - 1];
    var cueMarker = store.get(cueMarkerStartAt);
    console.log('Cuemarker at position ' + position);
    console.log(cueMarker);
    return cueMarker;
};

$(function() {
    var options = {
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        loaderColor: 'purple',
        cursorColor: 'navy'
    };
    wavesurfer.init(options);
    wavesurfer.load(audioTrack.nameOrUrl);

    renderCueMarkers();
});

function renderCueMarkers() {
    cuemarkers = CueMarker.findAll();
    var templateScript = $('#cueMarkersTemplate').html();
    var template = Handlebars.compile(templateScript);
    var context = {
        'cueMarkers': cuemarkers
    };
    var html = template(context);
    $('#cueMarkers').html(html);
}

$(document).on('click', '#playPause', function() {
    playPause();
});

$(document).on('click', '#addCue', function() {
    addCue();
});

$(document).on('click', '.removeCue', function() {
    var startAt = $(this).data('cuemarker');
    removeCue(startAt);
});

$(document).on('click', '.playCue', function() {
    var startAt = $(this).data('cuemarker');
    playCue(startAt);
});

$(document).on('click', '#loadTrack', function() {
    loadTrack();
});

$(document).keydown(function(e) {
    // Spacebar
    if (e.keyCode == 32) {
        playPause();
    }
    // +
    if (e.keyCode == 107 || e.keyCode == 187) {
        addCue();
    }
    // -
    if (e.keyCode == 109 || e.keyCode == 189) {
        popCue();
    }
    // 1-9
    if (e.keyCode >= 49 && e.keyCode <= 57) {
        position = e.keyCode - 48;
        playCueByPosition(position);
    }
    if (e.keyCode >= 96 && e.keyCode <= 105) {
        position = e.keyCode - 95;
        playCueByPosition(position);
    }
    // O
    if (e.keyCode == 79) {
        loadTrack();
    }
});

function playPause() {
    wavesurfer.playPause();

    $('#playPause').toggleClass('btn-success');
    $('#playPause').toggleClass('btn-warning');

    $('#playPauseIcon').toggleClass('fa-play');
    $('#playPauseIcon').toggleClass('fa-pause');

    if ($('#playPause').hasClass('btn-success')) {
        $('#playPauseText').text('Play');
    } else {
        $('#playPauseText').text('Pause');
    }
}

function addCue() {
    CueMarker.add();
    renderCueMarkers();
}

function removeCue(cueMarker) {
    CueMarker.remove(cueMarker);
    renderCueMarkers();
}

function popCue() {
    CueMarker.pop();
    renderCueMarkers();
}

function playCue(cueMarker) {
    wavesurfer.play(cueMarker);
}

function playCueByPosition(position) {
    var cueMarker = CueMarker.getByPosition(position);
    if (cueMarker)
        wavesurfer.play(cueMarker.startAt);
}

function loadTrack() {
    var fd = $.FileDialog({
        multiple: false,
        readAs: 'ArrayBuffer'
    });

    fd.on('files.bs.filedialog', function(ev) {
        var file = ev.files.pop();
        wavesurfer.loadBlob(file);
        audioTrack = new AudioTrack(file.name);
        $('#trackName').html(audioTrack.nameOrUrl);
        renderCueMarkers();
    });
}
