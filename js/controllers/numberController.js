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
  $('.actionRight').addClass('hide');
}
/* #endregion */

function validation() {
  var type = $('#typeSelect').val();
  if (type === RANDOM_CONST.TYPE.NUMBER) {
    numberModule.validation();
  }
  else if (type === RANDOM_CONST.TYPE.DATE) {
    timeModule.validation();
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
  $('.actionRight').removeClass('hide');
}