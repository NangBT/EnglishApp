var utilities = {
    random: {
        number: function randomNumber() {
            return Math.round(Math.random() * 1000000);
        },
        numberWithRange: function (num) {
            return Math.floor(Math.random() * num);
        },
        date: function randomDate() {
            return new Date(new Date() - Math.random() * (1e+12));
        },
        time: function randomTime() {
            return new Date(new Date() - Math.random() * (1e+12));
            //return new Date('2014/07/07 11:45:00');
        }
    },
    format: {
        numberToText: function formatNumberToText(val) {
            return parseFloat(val).toLocaleString('en-us');
        },
        dateToText: function formatDateToText(val) { //Mon Jul 07 2014 00:39:55 GMT+0700 (Indochina Time)
            return moment(val).format('dddd, MMMM Do, YYYY'); //7, 18/06/2022  => Saturday, June 8th, 2002 	
        }
    },
    convert: {
        sentenceCase: function sentenceCase(text) {

        }
    }
}