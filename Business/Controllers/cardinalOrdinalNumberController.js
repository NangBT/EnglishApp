$(document).ready(function () {
    bindingData();

    $('#randomNumberBtn').click(function () {
        bindingData();
    });

    $('#checkResultBtn').click(function () {
        checkCardinalNumber();

        //checkOrdinalNumber();

        //checkAcronym();
    });
});
