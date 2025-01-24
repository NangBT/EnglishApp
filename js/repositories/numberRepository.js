const numberRepository = {
  getCardinalTextByNumber(number) {
    let info = cardinalNumberTbl.find((x) => x.number === number);
    return (info != null && info != undefined) ? info.cardinal : "";
  },
  getOrdinalTextByNumber(number) {
    let info = ordinalNumberTbl.find((x) => x.number === number);
    return (info != null && info != undefined) ? info.ordinal : "";
  },
  formatOrdinalText(twoDigitsLast) {
    let numberText = '';
    if (twoDigitsLast === 0) { return "th"; }
    else if (twoDigitsLast < 13) { // 1 => 12
      numberText = numberRepository.getOrdinalTextByNumber(twoDigitsLast);
    } else if (13 <= twoDigitsLast && twoDigitsLast < 20) {// 13 => 19
      numberText = numberRepository.getCardinalTextByNumber(twoDigitsLast) + "th";
    } else if (twoDigitsLast % 10 === 0) { // 20, 30, 40, 50, 60, 70, 80, 90
      numberText = numberRepository.getCardinalTextByNumber(twoDigitsLast);
      numberText = numberText.substring(0, numberText.length - 1) + "ieth";
    } else {
      let unit = twoDigitsLast % 10;
      numberText = numberRepository.getCardinalTextByNumber(twoDigitsLast - unit);
      numberText += "-" + numberRepository.getOrdinalTextByNumber(unit);
    }
    return " " + numberText;
  }
};
