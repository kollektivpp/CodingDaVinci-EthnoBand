var ethnoBand = ethnoBand || {};

/**
 * This module contains the programmatic handling of alerts and small manuals, to help the user use Ethnoband.
 */
ethnoBand.manual = ethnoBand.manual || {

    /**
     * This function initializes all event handlers for the instrument list.
     */
    init: function() {
        this.closeHelp();
        this.UI.helpButton.on('click', this.showHelp);
        this.showWarningForNonTouchUsers();
        this.UI.warningCloseButton.on('click', this.closeWarning);
        this.UI.helpCloseButton.on('click', this.closeHelp);
    },

    UI: {
        warningWrapper: $('.warningWrapper'),
        warningWebAudioParagraph: $('.overlayParagraph.webAudioNotAvailable'),
        warningTouchEventsParagraph: $('.overlayParagraph.touchNotAvailable'),
        warningCloseButton: $('.warningOverlay .overlayClose'),
        helpWrapper: $('.helpWrapper'),
        helpButton: $('.helpButton'),
        helpCloseButton: $('.helpOverlay .overlayClose')
    },

    showWarningForNonTouchUsers: function() {
        var webAudioAvailable = window.AudioContext || window.webkitAudioContext;
            touchEventsAvailable =  this.touchEventsAvailable(),
            UI = ethnoBand.manual.UI;

        if (webAudioAvailable && touchEventsAvailable) {
            UI.warningWrapper.css('display', 'none');
        } else {
            if (touchEventsAvailable) {
                UI.warningTouchEventsParagraph.css('display', 'none');
            }
            if (webAudioAvailable) {
                UI.warningWebAudioParagraph.css('display', 'none');
            }
        }
    },

    touchEventsAvailable: function() {
        var msTouchEnabled = window.navigator.msMaxTouchPoints,
            generalTouchEnabled = "ontouchstart" in document.createElement("div");

        if (msTouchEnabled || generalTouchEnabled) {
            return true;
        } else {
            return false;
        }
    },

    closeWarning: function() {
        var warningWrapper = ethnoBand.manual.UI.warningWrapper;

        warningWrapper.css('display', 'none');
    },

    closeHelp: function() {
        var helpWrapper = ethnoBand.manual.UI.helpWrapper;

        helpWrapper.css('display', 'none');
    },

    showHelp: function() {
        var helpWrapper = ethnoBand.manual.UI.helpWrapper,
            keyboardInstruction = $('.helpWrapper .overlayParagraph.keyboardInstruction'),
            instrumentData = ethnoBand.data.getData(location.search.split("=")[1]),
            instructionText = ethnoBand.manual.getKeyboardInstructions(instrumentData.keyboard, instrumentData.numberOfSounds);

        keyboardInstruction.html(instructionText);

        helpWrapper.css('display', '');
    },

    getKeyboardInstructions: function(keyboardType, numberOfSounds) {

        switch (keyboardType) {
            case "DRUM":
                if (numberOfSounds === 1) {
                    return "Zum Spielen des Schlaginstruments, tappen Sie einfach auf den weißen Kreis unter dem Bild.";
                } else {
                    return "Zum Spielen des Schlaginstruments, tappen Sie einfach auf die Schlagflächen unter dem Bild. Jeder der Ringe erzeugt einen verschiedenen Klang!";
                }

            case "RATTLE":
                return "Um die Rassel zu spielen, wischen Sie mit Ihrem Finger auf der weißen Fläche hin und her. Jedes mal, wenn Sie die Mitte überschreiten, ertönt ein neuer Anschlag.";

            default:
                // Standard keys
                return "Unten sehen Sie eine Imitation der einzelnen Platten/Tasten/Glocken des Instruments. Jedes Element spielt einen anderen Ton des Instruments ab. Einfach drauf tappen!";
        }
    }
}