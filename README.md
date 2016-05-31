markitos
=================
<img src="https://travis-ci.org/ivansabik/markitos.svg">


Markitos is a simple app to create cue markers from an audio file and save them, runs completely client-side using Javascript HTML5 features. Great props to [wavesurfer.js](http://wavesurfer-js.org/) for providing the backend.

<img width="500" alt="" src="https://raw.githubusercontent.com/ivansabik/markitos/master/doc/screenshot.png">

## Dependencies

- jquery
- bootstrap
- wavesurfer.js

## Install

A quick and dirty setup using php built-in server is the following, you can use any other [one-liner static server](https://gist.github.com/willurd/5720255):

```
git clone https://github.com/ivansabik/markitos.git
cd markitos
bower install
php -S localhost:8000
```

If everything runs smooth, you can now go to http://localhost:8000

## Design

### Use cases

<img alt="" height="500" src="https://raw.githubusercontent.com/ivansabik/markitos/master/doc/use_cases.png">

### Models

<img alt="" src="https://raw.githubusercontent.com/ivansabik/markitos/master/doc/models.png">

### Specs

- As a user I should be able to load an audio track
- As a user I should be able to play an audio track
- As a user I should be able to pause an audio track
- As a user I should be able to add a new cue marker for an audio track
- As a user I should be able to edit a new cue marker for an audio track
- As a user I should be able to delete a new cue marker for an audio track
- As a user I should be able to export added cue markers
