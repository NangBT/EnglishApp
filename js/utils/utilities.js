var utilities = {
    random: {
        number: function randomNumber() {
            return Math.round(Math.random() * 1000000);
        },
        date: function randomDate() {
            return new Date(new Date() - Math.random() * (1e+12));
        },
        time: function randomTime() {
            //return new Date(new Date() - Math.random() * (1e+12));
            return new Date('2021/07/28 18:02:57'); //value="Sun Nov 16 2014 18:02:57 GMT+0700 (Indochina Time)"
        }
    },
    format: {
        numberToText: function formatNumberToText(val) {
            return parseFloat(val).toLocaleString('en-us');
        },
        dateToText: function formatDateToText(val) {
            return moment(val).format('dddd, MMMM Do, YYYY'); //7, 18/06/2022  => Saturday, June 8th, 2002 	
        }
    }
}