/* #region  Load Data When Page Load */
$(document).ready(function () {
  showItems();

  $("#typeSelect").change(function () {
    showItems();
  });
  $('#randomBtn').click(function () {
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
    else if (type === randomType.telling_the_time) {
      validationTellingTheTime();
    }
    $('.actionRight').removeClass('hide');
  });
});
/* #endregion */

/* #region  Random Data By Type: Random Number, Random Date, Random Time*/
function showItems() {
  var type = $('#typeSelect').val();
  if (type === randomType.number) {
    randomNumber();
  }
  else if (type === randomType.date) {
    randomDate();
  }
  else if (type === randomType.telling_the_time) {
    randomTime();
  }
  $('.actionRight').addClass('hide');
}
/* #endregion */

/* #region  Random Number For Cells Label */
function randomNumber() {
  $('#firstTh').html('Number');
  $('#secondTh').html('Cardinal Number');
  $('#thirdTh').html('Ordinal Number');
  $('#fourTh').html('Acronym');
  $('.fourthColumn').show();
  var rows = getRows();
  var lengthOfRows = getLengthOfRows(rows);

  for (var i = 1; i < lengthOfRows; i++) {
    var row = rows.eq(i);

    var randomValue = utilities.random.number();
    var lbl = row.find("td.firstColumn .lbl");
    lbl.html(utilities.format.numberToText(randomValue));

    var hdf = row.find("td.firstColumn .hdf");
    hdf.val(randomValue);
    resetRow(row);
  }
}
/* #endregion */

/* #region  Random Date For Cells Label */
function randomDate() {
  var rows = getRows();
  var lengthOfRows = getLengthOfRows(rows);

  for (var i = 1; i < lengthOfRows; i++) {
    var row = rows.eq(i);

    var randomValue = utilities.random.date();
    var lbl = row.find("td.firstColumn .lbl");
    lbl.html(moment(randomValue).format('d - DD/MM/YYYY'));

    var hdf = row.find("td.firstColumn .hdf");
    hdf.val(randomValue);
    resetRow(row);
  }

  $('#firstTh').html('Date');
  $('#secondTh').html('Full Date (Write)');
  $('#thirdTh').html('Full Date (Read)');
  $('.fourthColumn').hide();
}
/* #endregion */

/* #region  Random Time For Cells Label */
function randomTime() {
  var rows = getRows();
  var lengthOfRows = getLengthOfRows(rows);

  for (var i = 1; i < lengthOfRows; i++) {
    var row = rows.eq(i);
    var firstColumn = row.find('td.firstColumn');
    var randomValue = utilities.random.time();

    var lbl = firstColumn.find('.lbl');
    lbl.html(moment(randomValue).format('HH:mm'));
    var hdf = firstColumn.find('.hdf');
    hdf.val(randomValue);

    resetRow(row);
  }

  $('#firstTh').html('Time');
  $('#secondTh').html('Telling The Time (AM/PM)');
  $('#thirdTh').html('Telling The Time (Simple)');
  $('#fourthColumn').html('Telling The Time (Full)');
  $('.fourthColumn').show();
}
/* #endregion */

/* #region  Reset Value Of Cells in Row */
function resetRow(row) {
  resetCell(row, "secondColumn");
  resetCell(row, "thirdColumn");
  resetCell(row, "fourthColumn");

  row.removeClass("successCell");
  row.removeClass("errorCell");
}

function resetCell(row, cellClass) {
  var cell = row.find("td." + cellClass);
  cell.removeClass('successCell');
  cell.removeClass('errorCell');

  var txt = cell.find(".txt");
  txt.val("");

  var errorLbl = cell.find(".errorLbl");
  errorLbl.addClass("hide");
  errorLbl.html("");
}
/* #endregion */

/* #region  Validation Number */
function validationNumber() {
  var rows = getRows();
  var lengthOfRows = getLengthOfRows(rows);
  var scores = 0;
  for (var i = 1; i < lengthOfRows; i++) {
    var row = rows.eq(i);
    var firstColumn = row.find('td.firstColumn');
    var content = firstColumn.find('.hdf').val();
    var numberValue = parseInt(content);
    scores += validationCell(row, "secondColumn", numberService.convertNumberToText(numberValue).trim());

    var ordinalNumberText = numberService.convertThreeDigitToOrdinalText(numberValue).trim();
    scores += validationCell(row, "thirdColumn", ordinalNumberText);

    var twoCharacterLast = "";
    if (ordinalNumberText.length > 2) {
      twoCharacterLast = ordinalNumberText.substring(ordinalNumberText.length - 2, ordinalNumberText.length);
    }
    scores += validationCell(row, "fourthColumn", utilities.format.numberToText(content) + twoCharacterLast);
    $('#scoreLbl').html(scores + "/30");
  }
}
/* #endregion */

/* #region  Validation Date */
function validationDate() {
  var rows = getRows();
  var lengthOfRows = getLengthOfRows(rows);
  var scores = 0;
  for (var i = 1; i < lengthOfRows; i++) {
    var row = rows.eq(i);
    var firstColumn = row.find('td.firstColumn');
    var content = firstColumn.find('.hdf').val();
    var dateValue = moment(content);

    scores += validationCell(row, "secondColumn", utilities.format.dateToText(dateValue).trim());
    scores += validationCell(row, "thirdColumn", numberService.convertDateToFullDateForRead(dateValue));
  }
  $('#scoreLbl').html(scores + "/20");
}
/* #endregion */

/* #region  Validation Telling The Time */
function validationTellingTheTime() {
  var rows = getRows();
  var lengthOfRows = getLengthOfRows(rows);
  var scores = 0;
  for (var i = 1; i < lengthOfRows; i++) {
    var row = rows.eq(i);
    var firstColumn = row.find('td.firstColumn');
    var content = firstColumn.find('.hdf').val();
    var hours = parseInt(moment(content).format('HH'));
    var minutes = parseInt(moment(content).format('mm'));

    scores += validationCell(row, "secondColumn", numberService.convertTimeToTellingTimeAmPm(hours, minutes));
    scores += validationCell(row, "thirdColumn", numberService.convertTimeToTellingTimeSimple(hours, minutes));
    scores += validationCell(row, "fourthColumn", numberService.convertTimeToTellingTimeForWrite(hours, minutes));

  }
  $('#scoreLbl').html(scores + "/30");
}
/* #endregion */

/* #region  Validation Cell */
function validationCell(row, cellClass, isValueValid) {
  var score = 0;
  var cell = row.find('td.' + cellClass);
  cell.removeClass('errorCell');
  cell.removeClass('successCell');

  var errorLbl = cell.find('.errorLbl');
  errorLbl.addClass('hide');
  errorLbl.removeClass('error');

  if (cell.find('.txt').val().trim() === isValueValid) {
    cell.addClass('successCell');
    score++;
  }
  else {
    errorLbl.html(isValueValid);
    errorLbl.removeClass('hide');
    errorLbl.addClass('error');
    cell.addClass('errorCell');
  }
  return score;
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