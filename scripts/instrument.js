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

        ui.keyboardKeys.find('.key').on('click', function(){ console.log('CLICKED');});

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

        if(numberOfSounds > 0) {
            console.log(ui.keyboardDrum.children('.drumRing'));
            ui.keyboardDrum.children('.drumRing').on('click', function(event){event.stopPropagation(); console.log('OUTER');});
        }

        if (numberOfSounds > 1) {
            console.log(ui.keyboardDrum.children('.drumRing').children('.drumRing'));
             ui.keyboardDrum.children('.drumRing').children('.drumRing').on('click', function(event){event.stopPropagation(); console.log('INNER');});
        }

        ui.keyboardDrum.removeClass('invisible');
    },

    setupRoundKeys: function(itemNumber, numberOfSounds) {
        var ui = ethnoBand.instrument.UI,
            roundKeyPrototype = '<button class="roundKey"><span></span></button>',
            i;

        for (i = 0; i < numberOfSounds; i++) {
            ui.keyboardRoundKeys.append(roundKeyPrototype);
        }

        ui.keyboardRoundKeys.find('.roundKey').on('click', function(){console.log('ROUND CLICK');});

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

        ui.keyboardRoundKeysDouble.find('.roundKey').on('click', function(){console.log('ROUND DOUBLE CLICK');});

        ui.keyboardRoundKeysDouble.removeClass('invisible');
    }
};