var ethnoBand = ethnoBand || {};

ethnoBand.data = ethnoBand.data || {

    // The order of the data is:
    // - id
    // - name
    // - category
    // - origin
    // - keyboard style
    // - number of sounds
    plainData: {
        item1_1: ["vii-c-150-a-x", "gender panerus (Gamelan)", "Schlagplattenspiel", "Indonesien / Zentral-Java", "KEYS", 14],
        item1_2: ["vii-c-153-a-x", "gender barung (Gamelan)", "Schlagplattenspiel", "Indonesien / Zentral-Java", "KEYS", 14],
        item1_3: ["vii-c-156-a-x", "gender panembung (Gamelan)", "Schlagplattenspiel", "Indonesien / Zentral-Java", "KEYS", 7],

        item2_1: ["VII c 182 a-o -A x", "bonang barung (Gamelan)", "Gongspiel", "Indonesien / Zentral-Java", "ROUND_KEYS_DOUBLE", 14],
        item2_2: ["VII c 308 a-u -B x", "bonang (Gamelan Degung)", "Gongspiel", "Indonesien / West-Java", "ROUND_KEYS", 6],

        item3_1: ["vii-c-171-a -A x", "ketuk (Gamelan)", "selbstst&auml;ndiger Gong", "Indonesien / Zentral-Java", "DRUM", 1],
        item3_2: ["vii-c-172-e -A x", "kenong (Gamelan)", "Gongspiel", "Indonesien / Zentral-Java", "DRUM", 1],

        item4_1: ["vii-e-22-a-x", "surdo", "Zylindertrommel", "Brasilien", "DRUM", 2],

        item5_1: ["I C 1479 b -A x", "angklung", "Gleitrassel", "Indonesien / Java", "DRUM", 2],
        item5_2: ["I C 1479 c -A x", "angklung", "Gleitrassel", "Indonesien / Java", "DRUM", 2],
        item5_3: ["I C 1479 d -A x", "angklung", "Gleitrassel", "Indonesien / Java", "DRUM", 2],
        item5_4: ["I C 1479 e -A x", "angklung", "Gleitrassel", "Indonesien / Java", "DRUM", 2],
        item5_5: ["I C 1479 f -A x", "angklung", "Gleitrassel", "Indonesien / Java", "DRUM", 2],
        item5_6: ["I C 1479 g -A x", "angklung", "Gleitrassel", "Indonesien / Java", "DRUM", 2],
    },

    getData: function (itemString) {
        var dataObject = {},
            plainDataObject = this.getEntryForNumber(itemString);

            dataObject.id = plainDataObject[0];
            dataObject.name = plainDataObject[1];
            dataObject.category = plainDataObject[2];
            dataObject.origin = plainDataObject[3];
            dataObject.keyboard = plainDataObject[4];
            dataObject.numberOfSounds = plainDataObject[5];

        return dataObject;
    },

    getEntryForNumber: function(itemString) {
        var plainData = ethnoBand.data.plainData;

        switch (itemString) {
            case "1-1":
                return  plainData.item1_1;
            case "1-2":
                return  plainData.item1_2;
            case "1-3":
                return  plainData.item1_3;
            case "2-1":
                return  plainData.item2_1;
            case "2-2":
                return  plainData.item2_2;
            case "3-1":
                return  plainData.item3_1;
            case "3-2":
                return  plainData.item3_2;
            case "4-1":
                return  plainData.item4_1;
            case "5-1":
                return  plainData.item5_1;
            case "5-2":
                return  plainData.item5_2;
            case "5-3":
                return  plainData.item5_3;
            case "5-4":
                return  plainData.item5_4;
            case "5-5":
                return  plainData.item5_5;
            case "5-6":
                return  plainData.item5_6;
            default:
                console.log("No data found for this item number!");
        }
    },
};
