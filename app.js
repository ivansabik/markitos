var wavesurfer = Object.create(WaveSurfer);

function CueMarker() {
    this.timestamp = new Date();
    this.isActive = true;

}

CueMarker.findAll = function() {
  return [];
};

CueMarker.add = function(cueMarker) {
  return true;
};

$(function() {
    // Load wavesurfjs
    var options = {
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        loaderColor: 'purple',
        cursorColor: 'navy'
    };
    wavesurfer.init(options);
    wavesurfer.load('demo.mp3');

    renderCueMarkers();

    // Bind events
    $('#playPause').click(function() {
        playPause();
    });
    $('#addCue').click(function() {
        addCue();
    });
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

function loadWavesurfer() {

}

function playPause() {
    wavesurfer.playPause();

    $('#playPause').toggleClass('btn-success');
    $('#playPause').toggleClass('btn-warning');

    $('#playPauseIcon').toggleClass('fa-play');
    $('#playPauseIcon').toggleClass('fa-pause');

    if ($this.hasClass('btn-success')) {
        $('#playPauseText').text('Play');
    } else {
        $('#playPauseText').text('Pause');
    }
}

function addCue() {
  cueMarker = CueMarker();
  CueMarker.add(cueMarker);
  renderCueMarkers();
}

function removeCue() {

}

function playCue() {

}
