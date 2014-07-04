var ethnoBand = ethnoBand || {};

ethnoBand.list = ethnoBand.list || {

    /**
     * This function initializes all event handlers for the instrument list.
     */
    init: function() {
        this.closeOverlay();
        this.UI.overlayClose.on('click', this.closeOverlay);
        this.UI.listItems.on('click', this.openOverlay);
    },

    UI: {
        listItems:          $('.instrumentListItem'),
        overlayWrapper:     $('.overlayWrapper'),
        overlayClose:       $('.selectionOverlay .overlayClose'),
        overlayImg:         $('.selectionOverlay .overlayThumb'),
        overlayName:        $('.selectionOverlay .overlayName'),
        overlayCategory:    $('.selectionOverlay .overlayCategory'),
        overlayOrigin:      $('.selectionOverlay .overlayOrigin'),
        overlayAdditional:  $('.selectionOverlay .overlayAdditional'),
        overlayLink:        $('.selectionOverlay a')
    },

    closeOverlay: function(event) {
        var UI = ethnoBand.list.UI;

        UI.overlayWrapper.css('display', 'none');
    },

    openOverlay: function(event) {
        var UI = ethnoBand.list.UI,
            item = $(this).data('item'),
            overlayData = ethnoBand.data.getData(item);

        UI.overlayImg.attr('src', '../img/item' + item + '-thumb.jpg');
        UI.overlayName.html(overlayData.name);
        UI.overlayCategory.html(overlayData.category);
        UI.overlayOrigin.html(overlayData.origin);
        UI.overlayAdditional.html('');
        UI.overlayLink.attr('href', 'instrument.html?item=' + item);

        UI.overlayWrapper.css('display', '');
    }
};
