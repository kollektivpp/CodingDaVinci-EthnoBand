var ethnoBand = ethnoBand || {};

window.AudioContext = window.AudioContext || window.webkitAudioContext;

ethnoBand.sound = ethnoBand.sound || {
    
    context: new AudioContext(),

    soundBuffers: [],

    soundNodes: [],

    loadSoundFiles: function(itemNumber, numberOfSounds, keyElements) {
        var request;

        ethnoBand.sound.loadNextSoundfile(itemNumber, 1, numberOfSounds, keyElements, '../sounds/' + itemNumber + '-' + 1 + '.mp3');
    },

    loadNextSoundfile: function(itemNumber, index, numberOfSounds, keyElements, url) {
        var request,
            newIndex = index + 1;

        if (index > numberOfSounds) {
            return;
        }

        request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';

        request.onload = function() {
            ethnoBand.sound.context.decodeAudioData(request.response, function(buffer) {

                ethnoBand.sound.loadNextSoundfile(itemNumber, newIndex, numberOfSounds, keyElements, '../sounds/' + itemNumber + '-' + newIndex + '.mp3');

                ethnoBand.sound.createSoundNode(index, buffer, keyElements);

            }, function(error){console.log(error);});
        };

        request.send();
    },

    createSoundNode: function(index, buffer, keyElements) {
        var sourceNode = ethnoBand.sound.context.createBufferSource(),
            key = $(keyElements[index - 1]);

        ethnoBand.sound.soundBuffers[index] = buffer;

        sourceNode.buffer = buffer;
        sourceNode.connect(ethnoBand.sound.context.destination);

        ethnoBand.sound.soundNodes[index] = sourceNode;

        key.data('index', index);

        key.on('touchstart', ethnoBand.sound.playSoundHandler);
    },

    playSoundHandler: function(event) {
        var soundNodes = ethnoBand.sound.soundNodes,
            soundIndex = $(this).data('index'),
            backupIndex = soundIndex + 100;

        event.stopPropagation();

        if (soundNodes[backupIndex]) {
            soundNodes[backupIndex].stop(4);
        }

        soundNodes[soundIndex].start(0);

        soundNodes[backupIndex] = soundNodes[soundIndex];

        var newSoundNode = ethnoBand.sound.context.createBufferSource();
        newSoundNode.buffer = ethnoBand.sound.soundBuffers[soundIndex];
        newSoundNode.connect(ethnoBand.sound.context.destination);

        soundNodes[soundIndex] = newSoundNode;
    }
};