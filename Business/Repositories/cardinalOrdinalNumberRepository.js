var cardinalOrdinalNumberRepository = {
  getCardinalTextByNumber: function getCardinalTextByNumber(number) {
    var info = cardinalNumberTbl.find((x) => x.number === number);
    return (info != null && info != undefined) ? info.cardinal : "";
  },
  getOrdinalTextByNumber: function getOrdinalTextByNumber(number) {
    var info = ordinalNumberTbl.find((x) => x.number === number);
    return (info != null && info != undefined) ? info.ordinal : "";
  },
  formatOrdinalText: function formatOrdinalText(twoDigitsLast) {
    var numberText = '';
    if (twoDigitsLast === 0) { return "th"; }
    else if (twoDigitsLast < 13) { // 1 => 12
      numberText = cardinalOrdinalNumberRepository.getOrdinalTextByNumber(twoDigitsLast);
    } else if (13 <= twoDigitsLast && twoDigitsLast < 20) {// 13 => 19
      numberText = cardinalOrdinalNumberRepository.getCardinalTextByNumber(twoDigitsLast) + "th";
    } else if (twoDigitsLast % 10 === 0) { // 20, 30, 40, 50, 60, 70, 80, 90
      var numberText = cardinalOrdinalNumberRepository.getCardinalTextByNumber(twoDigitsLast);
      numberText = numberText.substring(0, numberText.length - 1) + "ieth";
    } else {
      var unit = twoDigitsLast % 10;
      var numberText = cardinalOrdinalNumberRepository.getCardinalTextByNumber(twoDigitsLast - unit);
      numberText += "-" + cardinalOrdinalNumberRepository.getOrdinalTextByNumber(unit);
    }
    return " " + numberText;
  }
};
