
var videoCodecs = [
    'video/mp4; codecs="avc1.42E01E"',
    'video/mp4; codecs="avc1.58A01E"',
    'video/mp4; codecs="avc1.4D401E"',
    'video/mp4; codecs="avc1.64001E"',
    'video/mp4; codecs="mp4v.20.8"',
    'video/mp4; codecs="mp4v.20.240"',
    'video/webm; codecs="vp8, vorbis"',
    'video/webm; codecs="vp9"',
    'video/webm; codecs="vp9.0"',
    'video/webm; codecs="av1"',
    'video/webm; codecs="hvc1"',
    'video/ogg; codecs="theora"'
];

var audioCodecs = [
    'audio/mpeg',
    'audio/mp4; codecs="mp4a.40.2"',
    'audio/mp4; codecs="mp4a.40.5"',
    'audio/mp4; codecs="mp4a.67"',
    'audio/ogg; codecs="vorbis"',
    'audio/ogg; codecs="opus"',
    'audio/webm; codecs="vorbis"',
    'audio/webm; codecs="opus"',
    'audio/wav; codecs="1"',
    'audio/flac',
];

function populateCodecList(codecArray, targetUlId) {
    const ul = document.getElementById(targetUlId);
    ul.innerHTML = ''; // clear existing list items

    codecArray.forEach(codec => {
        const li = document.createElement('li');
        li.textContent = codec;

        // Create removal button
        const removeButton = document.createElement('button');
        removeButton.textContent = '-';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', function() {
            ul.removeChild(li);
            const index = codecArray.indexOf(codec);
            if (index > -1) {
                codecArray.splice(index, 1);
            }
        });

        // Append the remove button to the list item
        li.appendChild(removeButton);
        ul.appendChild(li);
    });
}


document.addEventListener('DOMContentLoaded', function () {
    populateCodecList(videoCodecs, 'video-codec-list');
    populateCodecList(audioCodecs, 'audio-codec-list');
});

function addVideoCodec() {
    const input = document.getElementById('video-codec-input');
    if (input.value.trim() !== "") {
        videoCodecs.push(input.value.trim());
        populateCodecList(videoCodecs, 'video-codec-list');
        input.value = ''; // clear the input
    }
}

function addAudioCodec() {
    const input = document.getElementById('audio-codec-input');
    if (input.value.trim() !== "") {
        audioCodecs.push(input.value.trim());
        populateCodecList(audioCodecs, 'audio-codec-list');
        input.value = ''; // clear the input
    }
}


function getVideoSupportedCodecs() {
    var videoTestElement = document.createElement('video');

    var supportedVideoCodecs = [];

    videoCodecs.forEach(function (codec) {
        var canPlay = videoTestElement.canPlayType(codec);
        if (canPlay === "probably") {
            supportedVideoCodecs.push("Can probably play " + codec);
        } else if (canPlay === "maybe") {
            supportedVideoCodecs.push("Might be able to play " + codec);
        } else {
            supportedVideoCodecs.push("Cannot play " + codec);
        }
    });

    return supportedVideoCodecs;
}

function getAudioSupportedCodecs() {
    var audioTestElement = document.createElement('audio');

    var supportedAudioCodecs = [];

    audioCodecs.forEach(function (codec) {
        var canPlay = audioTestElement.canPlayType(codec);
        if (canPlay === "probably") {
            supportedAudioCodecs.push("Can probably play " + codec);
        } else if (canPlay === "maybe") {
            supportedAudioCodecs.push("Might be able to play " + codec);
        } else {
            supportedAudioCodecs.push("Cannot play " + codec);
        }
    });

    return supportedAudioCodecs;
}


function getResults() {
    const supportedVideoCodecs = getVideoSupportedCodecs();
    const supportedAudioCodecs = getAudioSupportedCodecs();

    const videoCodecsResultsDiv = document.getElementById("videoCodecResults");
    videoCodecsResultsDiv.innerHTML = supportedVideoCodecs.join("<br>");

    const audioCodecsResultsDiv = document.getElementById("audioCodecResults");
    audioCodecsResultsDiv.innerHTML = supportedAudioCodecs.join("<br>");
}