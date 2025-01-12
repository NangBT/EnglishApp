var timeService = {
    /* #region  Convert Time To Telling Time Am Or Pm */
    getTellingTimeForRead: function getTellingTimeForRead(hours, minutes, sessionType) {
        /* #region  Hours */
        var hoursText = "";
        if (0 <= hours && hours <= 11) {
            if (hours === 0) {
                hoursText = numberService.convertThreeDigitsToText(12);
            }
            else {
                hoursText = numberService.convertThreeDigitsToText(hours);
            }
        }
        else {
            if (hours > 12) {
                hoursText = numberService.convertThreeDigitsToText(hours - 12);
            }
            else {
                hoursText = numberService.convertThreeDigitsToText(hours);
            }
        }
        if (minutes === 0) {
            hoursText += "O'clock";
        }
        /* #endregion */

        /* #region  Minutes */
        var minutesText = "";
        if (minutes < 10) {
            minutesText = "Oh ";
        }
        minutesText += numberService.convertThreeDigitsToText(minutes).trim();
        /* #endregion */
        return "It's " + hoursText.trim() + " " + minutesText.trim() + " " + timeService.getSession(hours, minutes, sessionType);
    },
    /* #endregion */

    /* #region  Convert Time To Telling Time For Write */
    getTellingTimeForWrite: function getTellingTimeForWrite(hours, minutes, sessionType) {
        /* #region  Minutes */
        var minutesText = "";
        if (0 < minutes && minutes < 30) {
            if (minutes === 15) {
                minutesText = "Quarter";
            }
            else {
                minutesText = numberService.convertThreeDigitsToText(minutes);
            }
            minutesText += " Past";
        }
        else if (minutes === 30) {
            minutesText = " Half Past"
        }
        else {
            if ((60 - minutes) === 15) {
                minutesText = "Quarter";
            }
            else {
                minutesText = numberService.convertThreeDigitsToText(60 - minutes);
            }
            minutesText += " To"
        }
        //minutesText = (minutesText.length > 0) ? minutesText + " " : minutesText;
        /* #endregion */

        /* #region  Hours */
        var hoursText = "";
        var amPM = (hours >= 12) ? hours - 12 : (hours === 0) ? 12 : hours;
        if (minutes > 30) {
            amPM++;
        }
        hoursText = numberService.convertThreeDigitsToText(amPM);
        /* #endregion */
        return "It's " + minutesText.trim() + " " + hoursText.trim() + " " + timeService.getSession(hours, minutes, sessionType);
    },
    /* #endregion */
    getSession: function getSession(hours, minutes, sessionType) {
        if (sessionType === TIMING_CONST.SESSION_TYPE.AM_PM) {
            if (0 <= hours && hours <= 11) {
                return "AM";
            }
            else {
                return "PM";
            }
        }
        else if (sessionType === TIMING_CONST.SESSION_TYPE.IN) {
            if (hours === 0 && minutes === 0) {
                sessionText = 'Midnight';
            } else if (hours === 12 && minutes === 0) {
                sessionText = ' Noon';
            }
            else {
                if (0 <= hours && hours <= 11) {
                    return "In The Morning";
                }
                else if (12 <= hours && hours <= 17) {
                    return "In The Afternoon";
                }
                else if (18 <= hours && hours <= 20) {
                    return "In The Evening";
                } else if (21 <= hours) {
                    return "At Night";
                }
            }
        }
        return "";
    },

}