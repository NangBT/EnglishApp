var cardinalOrdinalNumberRepository = {
  getCardinalTextByNumber: function getCardinalTextByNumber(number) {
    var info = cardinalNumberTbl.find((x) => x.number === number);
    return (info != null && info != undefined) ? info.cardinal : "";
  },
  getOrdinalTextByNumber: function getOrdinalTextByNumber(number) {
    var info = ordinalNumberTbl.find((x) => x.number === number);
    return (info != null && info != undefined) ? info.ordinal : "";
  },
  formatOrdinalText: function formatOrdinalText(twoCharacterLast) {
    var numberText = '';
    if (twoCharacterLast === 0) { return "th"; }
    else if (twoCharacterLast < 13) { // 1 => 12
      numberText = cardinalOrdinalNumberRepository.getOrdinalTextByNumber(twoCharacterLast);
    } else if (13 <= twoCharacterLast && twoCharacterLast < 20) {// 13 => 19
      numberText = cardinalOrdinalNumberRepository.getCardinalTextByNumber(twoCharacterLast) + "th";

    } else if (twoCharacterLast % 10 === 0) { // 20, 30, 40, 50, 60, 70, 80, 90
      var numberText = cardinalOrdinalNumberRepository.getCardinalTextByNumber(twoCharacterLast);
      numberText = numberText.substring(0, numberText.length - 1) + "ieth";
    } else {
      var firstCharacter = twoCharacterLast.toString().substring(0, 1);
      var dozens = parseInt(firstCharacter + "0");
      var numberText = cardinalOrdinalNumberRepository.getCardinalTextByNumber(dozens);
      numberText += " " + cardinalOrdinalNumberRepository.getOrdinalTextByNumber(twoCharacterLast - dozens);
    }
    return " " + numberText;
  }
};
