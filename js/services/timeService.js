var timeService = {
    get: {
        tellingTime: function tellingTime(hours, minutes, sessionType) {
            if (sessionType === TIMING_CONST.SESSION_TYPE.IN) {
                if (minutes === 0 && (hours === 0 || hours === 12)) {
                    if (hours === 0) {
                        return "It's midnight";
                    }
                    else {
                        return "It's noon";
                    }
                }
            }
            var hoursText = timeService.get.hourText(hours, minutes, false);

            /* #region  Minutes */
            var minutesText = "";
            if (0 < minutes && minutes < 10) {
                minutesText = "Oh ";
            }
            minutesText += numberService.convertThreeDigitsToText(minutes).trim();
            /* #endregion */

            var sessionText = timeService.get.sessionText(hours, minutes, sessionType, false);
            var result = "It's";
            if (hoursText.length > 0) {
                result += " " + hoursText;
            }
            if (minutesText.trim().length > 0) {
                result += " " + minutesText.trim();
            }
            if (sessionText.length > 0) {
                result += " " + sessionText;
            }
            return result;
        },
        writeTime: function writeTime(hours, minutes, sessionType) {
            if (minutes === 0 && (hours === 0 || hours === 12)) {
                if (hours === 0) {
                    return "It's midnight";
                }
                else {
                    return "It's noon";
                }
            }
            else {
                /* #region  Minutes */
                var minutesText = "";
                if (0 <= minutes && minutes < 30) {
                    if (0 < minutes) {
                        if (minutes === 15) {
                            minutesText = "Quarter";
                        }
                        else {
                            minutesText = numberService.convertThreeDigitsToText(minutes);
                        }
                        minutesText += " Past";
                    }
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
                /* #endregion */
                var hoursText = timeService.get.hourText(hours, minutes, true);
                var sessionText = timeService.get.sessionText(hours, minutes, sessionType, true);

                var result = "It's";
                if (minutesText.trim().length > 0) {
                    result += " " + minutesText.trim();
                }
                if (hoursText.length > 0) {
                    result += " " + hoursText;
                }
                if (sessionText.length > 0) {
                    result += " " + sessionText;
                }
                return result;
            }
        },
        hourText: function hourText(hours, minutes, isRound) {

            var hoursText = "";
            if (hours === 0 || hours === 12) {
                if (minutes > 30 && isRound) {
                    hoursText = numberService.convertThreeDigitsToText(1);
                }
                else {
                    hoursText = numberService.convertThreeDigitsToText(12);
                }
            }
            else {
                var amOrPM = hours;
                if (hours > 12) {
                    amOrPM = hours - 12;
                }
                if (minutes > 30 && isRound) {
                    amOrPM++;
                }
                hoursText = numberService.convertThreeDigitsToText(amOrPM);
            }
            if (minutes === 0 || minutes === 60) {
                hoursText += " O'clock";
            }
            return hoursText.trim();
        },
        sessionText: function sessionText(hours, minutes, sessionType, isRound) {
            if (sessionType === TIMING_CONST.SESSION_TYPE.AM_PM) {
                if (0 <= hours && hours <= 11) {
                    return "AM";
                }
                else {
                    return "PM";
                }
            }
            else if (sessionType === TIMING_CONST.SESSION_TYPE.IN) {
                if (minutes > 30 && isRound) {
                    hours++;
                }
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
            return "";
        }
    }
}