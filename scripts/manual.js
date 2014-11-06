var ethnoBand = ethnoBand || {};

/**
 * This module contains the programmatic handling of alerts and small manuals, to help the user use Ethnoband.
 */
ethnoBand.manual = ethnoBand.manual || {

    /**
     * This function initializes all event handlers for the instrument list.
     */
    init: function() {
        this.showWarningForNonTouchUsers();
        this.UI.warningCloseButton.on('click', this.closeWarning);
    },

    UI: {
        warningWrapper: $('.warningWrapper'),
        warningWebAudioParagraph: $('.overlayParagraph.webAudioNotAvailable'),
        warningTouchEventsParagraph: $('.overlayParagraph.touchNotAvailable'),
        warningCloseButton: $('.warningOverlay .overlayClose')
    },

    showWarningForNonTouchUsers: function() {
        var webAudioAvailable = window.AudioContext || window.webkitAudioContext;
            touchEventsAvailable =  this.touchEventsAvailable(),
            UI = ethnoBand.manual.UI;

        if (webAudioAvailable && touchEventsAvailable) {
            UI.warningWrapper.css('display', 'none');
        } else {
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
    }
}