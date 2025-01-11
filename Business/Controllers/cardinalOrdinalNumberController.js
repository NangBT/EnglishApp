/* #region  Load Data When Page Load */
$(document).ready(function () {
  showItems();

  $("#typeSelect").change(function () {
    showItems();
  });

  $("#completedBtn").click(function () {
    var type = $('#typeSelect').val();
    if (type === randomType.number) {
      validationNumber();
    }
    else if (type === randomType.date) {
      validationDate();
    }
    $('.actionRight').removeClass('hide');
  });
});
/* #endregion */

/* #region  Random Data By Type: Random Number, Random Date, Random Time*/
function showItems() {
  var type = $('#typeSelect').val();
  if (type === randomType.number) {
    loadRandomNumber();
  }
  else if (type === randomType.date) {
    loadRandomDate();
  }
  $('.actionRight').addClass('hide');
}
/* #endregion */

/* #region  Load Random Number For Cells Label */
function loadRandomNumber() {
  $('#firstTh').html('Number');
  $('#secondTh').html('Cardinal Number');
  $('#thirdTh').html('Ordinal Number');
  $('#fourTh').html('Acronym');
  $('.fourthColumn').removeClass('hide')

  var rows = getRows();
  var lengthOfRows = getLengthOfRows(rows);

  for (var i = 1; i < lengthOfRows; i++) {
    var row = rows.eq(i);

    var randomValue = utilities.random.number();
    var lbl = row.find("td.firstColumn .lbl");
    lbl.html(utilities.format.numberToText(randomValue));

    var hdf = row.find("td.firstColumn .hdf");
    hdf.val(randomValue);
    // var txt = row.find('td.firstColumn .txt');
    // txt.val(utilities.format.numberToText(randomValue));
    resetRow(row);
  }
}
/* #endregion */

/* #region  Load Random Date For Cells Label */
function loadRandomDate() {
  var rows = getRows();
  var lengthOfRows = getLengthOfRows(rows);

  for (var i = 1; i < lengthOfRows; i++) {
    var row = rows.eq(i);

    var randomValue = utilities.random.date();
    var lbl = row.find("td.firstColumn .lbl");
    lbl.html(moment(randomValue).format('d - DD/MM/YYYY'));

    var hdf = row.find("td.firstColumn .hdf");
    hdf.val(randomValue);
    // var txt = row.find('td.firstColumn .txt');
    // txt.val(utilities.format.dateToText(randomValue));
    resetRow(row);
  }

  $('#firstTh').html('Date');
  $('#secondTh').html('Full Date (Write)');
  $('#thirdTh').html('Full Date (Read)');
  $('#fourTh').html('');
  $('.fourthColumn').addClass('hide')
}
/* #endregion */

/* #region  Reset Value Of Cells in Row */
function resetRow(row) {
  var secondColumn = row.find("td.secondColumn");
  secondColumn.removeClass('successCell');
  secondColumn.removeClass('errorCell');
  var secondTxt = secondColumn.find(".txt");
  secondTxt.val("");

  var secondLblError = secondColumn.find(".lblError");
  secondLblError.addClass("hide");
  secondLblError.html("");

  var thirdColumn = row.find("td.thirdColumn");
  thirdColumn.removeClass('successCell');
  thirdColumn.removeClass('errorCell');
  var thirdTxt = thirdColumn.find(".txt");
  thirdTxt.val("");

  var thirdLblError = thirdColumn.find(".lblError");
  thirdLblError.addClass("hide");
  thirdLblError.html("");

  var fourthColumn = row.find("td.fourthColumn");
  var fourthTxt = fourthColumn.find(".txt");
  fourthTxt.val("");

  var fourthLblError = fourthColumn.find(".lblError");
  fourthLblError.addClass("hide");
  fourthLblError.html("");

  row.removeClass("successCell");
  row.removeClass("errorCell");
}
/* #endregion */

/* #region  Validation Number */
function validationNumber() {
  var rows = getRows();
  var lengthOfRows = getLengthOfRows(rows);
  var scores = 0;
  for (var i = 1; i < lengthOfRows; i++) {
    var row = rows.eq(i);
    // var numberValue = row.find('td.firstColumn .lbl').html();
    //var numberValue = row.find('td.firstColumn .txt').val();

    var hdf = row.find("td.firstColumn .hdf");
    var numberValue = hdf.val();

    row.removeClass("successCell");
    row.removeClass("errorCell");

    scores += getTotalCellCorrect(
      numberValue,
      row,
      "secondColumn",
      cardinalOrdinalNumberConstant.type.cardinal
    );
    scores += getTotalCellCorrect(
      numberValue,
      row,
      "thirdColumn",
      cardinalOrdinalNumberConstant.type.ordinal
    );
    scores += getTotalCellCorrect(
      numberValue,
      row,
      "fourthColumn",
      cardinalOrdinalNumberConstant.type.ordinal
    );
  }
  $('#scoreLbl').html(scores + "/30");
  $('.actionRight').removeClass('hide');
}

function getTotalCellCorrect(numberValue, row, classCell, type) {
  var scores = 0;
  var td = row.find("td." + classCell);
  var txt = td.find(".txt");

  var lblError = td.find(".lblError");
  lblError.addClass("hide");
  lblError.removeClass('error')
  if (txt.val().length > 0) {
    var numberText = "";
    if (type === cardinalOrdinalNumberConstant.type.cardinal) {
      numberText = cardinalOrdinalNumberService.convertNumberToText(parseInt(numberValue)).trim();
    } else {
      numberText = cardinalOrdinalNumberService.convertThreeDigitToOrdinalNumberText(parseInt(numberValue)).trim();
    }

    if (classCell === "fourthColumn") {
      if (numberText !== "") {
        var twoCharacterLast = numberText.substring(
          numberText.length - 2,
          numberText.length
        );
        var acronymText = utilities.format.numberToText(numberValue) + twoCharacterLast.toLowerCase().trim();
        if (txt.val().toLowerCase().trim() === acronymText) {
          td.addClass('successCell');
          scores++;
        } else {
          numberText = acronymText;
          lblError.html(numberText);
          lblError.removeClass("hide");
          lblError.addClass('error');
          td.addClass('errorCell');
        }
      }
    } else {
      if (numberText.toLowerCase() === txt.val().toLowerCase()) {
        td.addClass('successCell');
        scores++;
      }
      else {
        lblError.html(numberText);
        lblError.removeClass("hide");
        lblError.addClass('error');
        td.addClass('errorCell');
      }
    }
  }
  return scores;
}
/* #endregion */

/* #region  Validation Date */
function validationDate() {
  var rows = getRows();
  var lengthOfRows = getLengthOfRows(rows);
  var score = 0;
  for (var i = 1; i < lengthOfRows; i++) {
    var row = rows.eq(i);

    var firstColumn = row.find('td.firstColumn');
    var dateText = firstColumn.find('.hdf').val();
    var dateValue = moment(dateText)

    var secondColumn = row.find('td.secondColumn');
    secondColumn.removeClass('successCell');
    secondColumn.removeClass('errorCell');
    var secondLblError = secondColumn.find('.lblError');
    secondLblError.addClass('hide');
    secondLblError.removeClass('error');

    var dateWriteValid = utilities.format.dateToText(dateValue).trim();
    if (secondColumn.find('.txt').val().trim() === dateWriteValid) {
      secondColumn.addClass('successCell');
      score++;
    }
    else {
      secondLblError.html(dateWriteValid);
      secondLblError.removeClass('hide');
      secondLblError.addClass('error');
      secondColumn.addClass('errorCell');
    }

    var thirdColumn = row.find('td.thirdColumn');
    thirdColumn.removeClass('errorCell');
    thirdColumn.removeClass('successCell');

    var thirdLblError = thirdColumn.find('.lblError');
    thirdLblError.addClass('hide');
    thirdLblError.removeClass('error');

    var dateReadValid = cardinalOrdinalNumberService.convertDateToFullDateForRead(dateValue).trim();
    if (thirdColumn.find('.txt').val().trim() === dateReadValid) {
      thirdColumn.addClass('successCell');
      score++;
    }
    else {
      thirdLblError.html(dateReadValid);
      thirdLblError.removeClass('hide');
      thirdLblError.addClass('error');
      thirdColumn.addClass('errorCell');
    }
  }
  $('#scoreLbl').html(score + "/20");
  $('.actionRight').removeClass('hide');
}
/* #endregion */

/* #region  Get Length Of Rows */
function getLengthOfRows(rows) {
  if (rows != null && rows != typeof undefined) {
    return getRows().length;
  }
  return 0;
  //return 2;
}
/* #endregion */

/* #region  Get Rows In Table */
function getRows() {
  return $("#randomNumberTbl").find("tr");
}
/* #endregion */