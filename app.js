var wavesurfer = Object.create(WaveSurfer);

$(document).ready(function() {
    var options = {
        container: '#waveform',
        waveColor: 'violet',
        progressColor: 'purple',
        loaderColor: 'purple',
        cursorColor: 'navy'
    };
    wavesurfer.init(options);
    wavesurfer.load('demo.mp3');

    $('#playPause').click(function() {
        var $this = $(this);

        wavesurfer.playPause();

        $this.toggleClass('btn-success');
        $this.toggleClass('btn-warning');

        $('#playPauseIcon').toggleClass('fa-play');
        $('#playPauseIcon').toggleClass('fa-pause');

        if($this.hasClass('btn-success')){
            $('#playPauseText').text('Play');
        } else {
          $('#playPauseText').text('Pause');
        }

    });
});
