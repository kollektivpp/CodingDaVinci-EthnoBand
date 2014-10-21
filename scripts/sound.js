var ethnoBand = ethnoBand || {};

window.AudioContext = window.AudioContext || window.webkitAudioContext;

ethnoBand.sound = ethnoBand.sound || {
    
    context: new AudioContext(),

    soundBuffers: [],

    soundNodes: [],

    createSoundNode: function(audioBuffer) {
        var sourceNode = ethnoBand.sound.context.createBufferSource(),
            gainNode = ethnoBand.sound.context.createGain();

        sourceNode.buffer = audioBuffer;
        sourceNode.connect(gainNode);
        gainNode.connect(ethnoBand.sound.context.destination);
        gainNode.gain.value = 0.4;

        return sourceNode;
    },

    /** PROCESS FOR LOADING KEYBOARD SOUNDS **/
    loadSoundFiles: function(itemNumber, numberOfSounds, keyElements) {
        ethnoBand.sound.loadNextSoundfile(itemNumber, 1, numberOfSounds, keyElements, '../sounds/' + itemNumber + '-' + 1 + '.mp3');
    },

    // In the standard keyboard sound loading, the order is important, so all the sounds are loaded sequentially.
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

                ethnoBand.sound.createIndexedSoundNode(index, buffer, keyElements);

            }, function(error){console.log(error);});
        };

        request.send();
    },

    createIndexedSoundNode: function(index, buffer, keyElements) {
        var key = $(keyElements[index - 1]);

        ethnoBand.sound.soundBuffers[index] = buffer;
        ethnoBand.sound.soundNodes[index] = ethnoBand.sound.createSoundNode(buffer);

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

        soundNodes[soundIndex] = ethnoBand.sound.createSoundNode(ethnoBand.sound.soundBuffers[soundIndex]);
    },


    /** PROCESS FOR LOADING ROUND ROBIN FILES (e.g. RATTLE SOUNDS) **/

    roundRobinMeta: {
        lastIndex       : undefined,
        numberOfSounds  : 0,       
    },

    rattleMeta: {
        newSoundThreshold   : undefined,
        lastSoundPosition   : 0
    },

    loadRoundRobinFiles: function(itemNumber, numberOfSounds, keyElement) {
        var request,
            i = 1;

        // The order of the the round robin sounds don't matter. That's why a standard loop can be used for loading.
        for (i; i <= numberOfSounds; i++) {
            request = new XMLHttpRequest();
            request.open('GET', '../sounds/' + itemNumber + '-' + i + '.mp3', true);
            request.responseType = 'arraybuffer';
            request.onload = ethnoBand.sound.onLoadRoundRobinFile;
            request.send();
        }

        if (keyElement.hasClass('rattleKey')) {
            this.roundRobinMeta.numberOfSounds = numberOfSounds;
            setTimeout(function() {
               ethnoBand.sound.rattleMeta.newSoundThreshold = parseInt($(window).width() / 2, 10);
           }, 0);
            keyElement.on('touchmove', this.rattleSoundHandler);
        }
    },

    onLoadRoundRobinFile: function() {
        ethnoBand.sound.context.decodeAudioData(this.response, function(buffer) {

            var sourceNode = ethnoBand.sound.context.createBufferSource(),
                gainNode = ethnoBand.sound.context.createGain();

            ethnoBand.sound.soundBuffers.push(buffer);
            ethnoBand.sound.soundNodes.push(ethnoBand.sound.createSoundNode(buffer));

        }, function(error){console.log(error);});
    },

    rattleSoundHandler: function(event) {

        var posX = event.originalEvent.touches[0].clientX,
            lastSoundPosition = ethnoBand.sound.rattleMeta.lastSoundPosition,
            newSoundThreshold = ethnoBand.sound.rattleMeta.newSoundThreshold;

        if (lastSoundPosition < newSoundThreshold) {
            if (posX > newSoundThreshold) {
                // console.log("new sound high");
                ethnoBand.sound.playRoundRobinSound();
                ethnoBand.sound.rattleMeta.lastSoundPosition = posX;
            }
        } else {
            if (posX < newSoundThreshold) {
                // console.log("new sound low");
                ethnoBand.sound.playRoundRobinSound();
                ethnoBand.sound.rattleMeta.lastSoundPosition = posX;
            }
        }
    },

    playRoundRobinSound: function() {
        var randomIndex = Math.floor(Math.random() * ethnoBand.sound.roundRobinMeta.numberOfSounds),
            lastIndex = ethnoBand.sound.roundRobinMeta.lastIndex,
            backupIndex = 100,
            soundNodes = ethnoBand.sound.soundNodes;

        event.stopPropagation();

        // Avoiding the same sound twice in a row
        if (randomIndex === ethnoBand.sound.roundRobinMeta.lastIndex) {
            if (randomIndex > 0) {
                randomIndex--;
            } else if (randomIndex < ethnoBand.sound.roundRobinMeta.numberOfSounds - 1) {
                randomIndex++;
            }
        }

        if (soundNodes[backupIndex]) {
            // For the relly short rattle sounds, no sound stop is needed.
            // soundNodes[backupIndex].stop(1);
        }

        soundNodes[randomIndex].start(0);
        // soundNodes[backupIndex] = soundNodes[randomIndex];

        soundNodes[randomIndex] = ethnoBand.sound.createSoundNode(ethnoBand.sound.soundBuffers[randomIndex]);

        ethnoBand.sound.roundRobinMeta.lastIndex = randomIndex;
    }
};