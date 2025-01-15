var utilities = {
    random: {
        number() {
            return Math.round(Math.random() * 1000000);
        },
        numberWithRange(num) {
            return Math.floor(Math.random() * num);
        },
        date() {
            return new Date(new Date() - Math.random() * (1e+12));
        },
        time() {
            return new Date(new Date() - Math.random() * (1e+12));
            //return new Date('2014/07/07 11:45:00');
        }
    },
    format: {
        numberToText(val) {
            return parseFloat(val).toLocaleString('en-us');
        },
        dateToText(val) { //Mon Jul 07 2014 00:39:55 GMT+0700 (Indochina Time)
            return moment(val).format('dddd, MMMM Do, YYYY'); //7, 18/06/2022  => Saturday, June 8th, 2002 	
        }
    },
    convert: {
        sentenceCase(text) {

        }
    }
}