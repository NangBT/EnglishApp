/* #region  Load Data When Page Load */
$(document).ready(function () {
  showItems();

  $('#resetBtn').click(function () {
    var rows = helperModule.get.rows();
    var lengthOfRows = helperModule.get.lengthOfRows(rows);
    for (var i = 1; i < lengthOfRows; i++) {
      var row = rows.eq(i);
      helperModule.reset.row(row);
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
const showItemInHomePage = {
  number: () => numberModule.random(),
  date: () => dateModule.random(),
  telling_the_time: () => timeModule.random(),
  vocabulary_country: () => countryNationalityModule.random.vocabulary(),
  question_country: () => countryNationalityModule.random.question(),
  animal: () => animalModule.random.vocabulary(),
  fruit: () => fruitModule.random.vocabulary()
};

const validationInHomePage = {
  number: () => numberModule.validation(),
  date: () => dateModule.validation(),
  telling_the_time: () => timeModule.validation(),
  vocabulary_country: () => countryNationalityModule.validation.vocabulary(),
  question_country: () => countryNationalityModule.validation.question(),
  animal: () => animalModule.validation.vocabulary(),
  fruit: () => fruitModule.validation.vocabulary()
}
/* #region  Random Data By Type: Random Number, Random Date, Random Time*/
function showItems() {
  var type = $('#typeSelect').val();
  showItemInHomePage[type]();
  $('.actionRight').addClass('hide');
}
/* #endregion */

function validation() {
  var type = $('#typeSelect').val();
  validationInHomePage[type]();
  $('.actionRight').removeClass('hide');
}