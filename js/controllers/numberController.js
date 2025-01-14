/* #region  Load Data When Page Load */
$(document).ready(function () {
  showItems();

  $('#resetBtn').click(function () {
    var rows = helperModule.getRows();
    var lengthOfRows = helperModule.getLengthOfRows(rows);
    for (var i = 1; i < lengthOfRows; i++) {
      var row = rows.eq(i);
      helperModule.resetRow(row);
    }
  });

  $("#typeSelect").change(function () {
    showItems();
  });
  $('#randomBtn').click(function () {
    showItems();
  });

  $("#completedBtn").click(function () {
    validation();
  });
});
/* #endregion */

/* #region  Random Data By Type: Random Number, Random Date, Random Time*/
function showItems() {
  var type = $('#typeSelect').val();
  if (type === RANDOM_CONST.TYPE.NUMBER) {
    numberModule.random();
  }
  else if (type === RANDOM_CONST.TYPE.DATE) {
    dateModule.random();
  }
  else if (type === RANDOM_CONST.TYPE.TELLING_THE_TIME) {
    timeModule.random();
  }
  else if (type === RANDOM_CONST.TYPE.COUNTRY_VOCABULARY) {
    countryNationalityModule.random.vocabulary();
  }
  else if (type === RANDOM_CONST.TYPE.COUNTRY_QUESTION) {
    countryNationalityModule.random.question();
  }
  else if (type === RANDOM_CONST.TYPE.ANIMAL) {
    animalModule.random.vocabulary();
  }
  else if (type === RANDOM_CONST.TYPE.FRUIT) {
    fruitModule.random.vocabulary();
  }
  $('.actionRight').addClass('hide');
}
/* #endregion */

function validation() {
  var type = $('#typeSelect').val();
  if (type === RANDOM_CONST.TYPE.NUMBER) {
    numberModule.validation();
  }
  else if (type === RANDOM_CONST.TYPE.DATE) {
    dateModule.validation();
  }
  else if (type === RANDOM_CONST.TYPE.TELLING_THE_TIME) {
    timeModule.validation();
  }
  else if (type === RANDOM_CONST.TYPE.COUNTRY_VOCABULARY) {
    countryNationalityModule.validation.vocabulary();
  }
  else if (type === RANDOM_CONST.TYPE.COUNTRY_QUESTION) {
    countryNationalityModule.validation.question();
  }
  else if (type === RANDOM_CONST.TYPE.ANIMAL) {
    animalModule.validation.vocabulary();
  }
  else if (type === RANDOM_CONST.TYPE.FRUIT) {
    fruitModule.validation.vocabulary();
  }
  $('.actionRight').removeClass('hide');
}