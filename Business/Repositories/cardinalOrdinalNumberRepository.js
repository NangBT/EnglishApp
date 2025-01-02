var cardinalOrdinalNumberRepository = {
    getCardinalTextByNumber: function getCardinalTextByNumber(number) {
        var info = cardinalNumberTbl.find(x => x.number === number);
        if (info != null && info != undefined) {
            return info.cardinal;
        }
        return '';
    },

    getOrdinalTextByNumber: function getOrdinalTextByNumber(number) {
        var info = ordinalNumberTbl.find(x => x.number === number);
        if (info != null && info != undefined) {
            return info.ordinal;
        }
        else {
            var cardinalText = cardinalOrdinalNumberRepository.getCardinalTextByNumber(number);
            return cardinalText;
        }
    },
    formatOrdinalText: function formatOrdinalText(numberValue, numberText) {
        if (numberText !== '') {
            var twoCharacterLast = parseInt(numberValue.toString().substring(numberValue.toString().length - 2, numberValue.toString().length));
            if (13 <= twoCharacterLast && twoCharacterLast < 20) { // 13 => 19
                return numberText + 'th';
            }
            else if (twoCharacterLast > 10 && numberValue % 10 === 0) { // 20, 30, 40, 50, 60, 70, 80, 90
                return numberText = numberText.substring(0, numberText.length - 1) + 'ieth';
            }
        }
        return numberText;
    },
    getTextByNumber: function getTextByNumber(number, type) {
        if (type == cardinalOrdinalNumberConstant.type.cardinal) {
            return cardinalOrdinalNumberRepository.getCardinalTextByNumber(number);
        }
        else if (type == cardinalOrdinalNumberConstant.type.ordinal) {
            return cardinalOrdinalNumberRepository.getOrdinalTextByNumber(number);
        }
        return '';
    }
};
