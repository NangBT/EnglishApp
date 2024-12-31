function getCardinalTextByNumber(number) {
    var info = cardinalNumberTbl.find(x => x.number === number);
    if (info != null && info != undefined) {
        return info.cardinal;
    }
    return "";
}