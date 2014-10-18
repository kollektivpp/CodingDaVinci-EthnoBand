var ethnoBand = ethnoBand || {};

ethnoBand.instrument = ethnoBand.instrument || {

    initImage: function() {
        var item = location.search.split("=")[1],
            ui = ethnoBand.instrument.UI;

        ui.largeImage.attr('src', '../img/item' + item + '.jpg');
    },

    initKeyboard: function() {
        var itemNumber = location.search.split("=")[1],
            instrumentData = ethnoBand.data.getData(itemNumber);

        if (instrumentData.keyboard === "KEYS") {
            this.setupKeys(itemNumber, instrumentData.numberOfSounds);
        }
        if (instrumentData.keyboard === "DRUM") {
            this.setupDrum(itemNumber, instrumentData.numberOfSounds);
        }
        if (instrumentData.keyboard === "ROUND_KEYS") {
            this.setupRoundKeys(itemNumber, instrumentData.numberOfSounds);
        }
        if (instrumentData.keyboard === "ROUND_KEYS_DOUBLE") {
            this.setupRoundKeysDouble(itemNumber, instrumentData.numberOfSounds);
        }
    },

    UI: {
        largeImage: $('img.largeImage'),
        keyboardSection: $('#keyboard'),
        keyboardKeys: $('#keyboard .keys'),
        keyboardDrum: $('#keyboard .drum'),
        keyboardRoundKeys: $('#keyboard .roundKeys'),
        keyboardRoundKeysDouble: $('#keyboard .roundKeysDouble'),
        keyboardRoundKeysDoubleUpperRow: $('#keyboard .roundKeysDouble .upperRow'),
        keyboardRoundKeysDoubleLowerRow: $('#keyboard .roundKeysDouble .lowerRow'),
    },

    setupKeys: function(itemNumber, numberOfSounds) {
        var ui = ethnoBand.instrument.UI,
            keyPrototype = '<button class="key"><span class="stringTop"></span><span class="stringBottom"></span></button>',
            i;

        for (i = 0; i < numberOfSounds; i++) {
            ui.keyboardKeys.append(keyPrototype);
        }

        ethnoBand.sound.loadSoundFiles(itemNumber, numberOfSounds, ui.keyboardKeys.find('.key'));

        ui.keyboardKeys.removeClass('invisible');
    },

    setupDrum: function(itemNumber, numberOfSounds) {
        var ui = ethnoBand.instrument.UI,
            keyPrototype = '<button class="drumRing"></button>',
            lastRingElement,
            i;

        ui.keyboardDrum.append(keyPrototype);
        lastRingElement = ui.keyboardDrum.children('.drumRing');

        for (i = 1; i < numberOfSounds; i++) {
            lastRingElement.append(keyPrototype);
            lastRingElement = lastRingElement.children('.drumRing');
        }

        ethnoBand.sound.loadSoundFiles(itemNumber, numberOfSounds, ui.keyboardDrum.find('.drumRing'));

        ui.keyboardDrum.removeClass('invisible');
    },

    setupRoundKeys: function(itemNumber, numberOfSounds) {
        var ui = ethnoBand.instrument.UI,
            roundKeyPrototype = '<button class="roundKey"><span></span></button>',
            i;

        for (i = 0; i < numberOfSounds; i++) {
            ui.keyboardRoundKeys.append(roundKeyPrototype);
        }

        ethnoBand.sound.loadSoundFiles(itemNumber, numberOfSounds, ui.keyboardRoundKeys.find('.roundKey'));

        ui.keyboardRoundKeys.removeClass('invisible');
    },

    setupRoundKeysDouble: function(itemNumber, numberOfSounds) {
        var ui = ethnoBand.instrument.UI,
            roundKeyPrototype = '<button class="roundKey"><span></span></button>',
            i;

        for (i = 0; i < numberOfSounds/2; i++) {
            ui.keyboardRoundKeysDoubleUpperRow.append(roundKeyPrototype);
        }
        for (i = 0; i < numberOfSounds/2; i++) {
            ui.keyboardRoundKeysDoubleLowerRow.append(roundKeyPrototype);
        }

        ethnoBand.sound.loadSoundFiles(itemNumber, numberOfSounds, ui.keyboardRoundKeysDouble.find('.roundKey'));

        ui.keyboardRoundKeysDouble.removeClass('invisible');
    }
};