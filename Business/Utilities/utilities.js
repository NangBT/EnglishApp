var utilities = {
    randomNumber: function randomNumber() {
        return Math.round(Math.random() * 100);
    },
    formatNumber: function formatNumber(number) {
        return parseFloat(number).toLocaleString('en-us');
    }
}
