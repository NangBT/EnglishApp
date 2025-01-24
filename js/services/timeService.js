const timeService = {
    get: {
        tellingTime(objInfo) {
            if (objInfo.sessionType === TIMING_CONST.SESSION_TYPE.IN) {
                if (objInfo.minutes === 0 && (objInfo.hours === 0 || objInfo.hours === 12)) {
                    if (objInfo.hours === 0) {
                        return "It's midnight";
                    }
                    else {
                        return "It's noon";
                    }
                }
            }
            let hoursText = timeService.get.hourText(objInfo.hours, objInfo.minutes, false);

            /* #region  Minutes */
            let minutesText = "";
            if (0 < objInfo.minutes && objInfo.minutes < 10) {
                minutesText = "Oh ";
            }
            minutesText += numberService.convertThreeDigitsToText(objInfo.minutes).trim();
            /* #endregion */

            let sessionText = timeService.get.sessionText(objInfo.hours, objInfo.minutes, objInfo.sessionType, false);
            let result = "It's";
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
        writeTime(objInfo) {
            if (objInfo.minutes === 0 && (objInfo.hours === 0 || objInfo.hours === 12)) {
                if (objInfo.hours === 0) {
                    return "It's midnight";
                }
                else {
                    return "It's noon";
                }
            }
            else {
                /* #region  Minutes */
                let minutesText = "";
                if (0 <= objInfo.minutes && objInfo.minutes < 30) {
                    if (0 < objInfo.minutes) {
                        if (objInfo.minutes === 15) {
                            minutesText = "Quarter";
                        }
                        else {
                            minutesText = numberService.convertThreeDigitsToText(objInfo.minutes);
                        }
                        minutesText += " Past";
                    }
                }
                else if (objInfo.minutes === 30) {
                    minutesText = " Half Past"
                }
                else {
                    if ((60 - objInfo.minutes) === 15) {
                        minutesText = "Quarter";
                    }
                    else {
                        minutesText = numberService.convertThreeDigitsToText(60 - objInfo.minutes);
                    }
                    minutesText += " To"
                }
                /* #endregion */
                let hoursText = timeService.get.hourText(objInfo.hours, objInfo.minutes, true);
                let sessionText = timeService.get.sessionText(objInfo.hours, objInfo.minutes, objInfo.sessionType, true);

                let result = "It's";
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
        hourText(hours, minutes, isRound) {

            let hoursText = "";
            if (hours === 0 || hours === 12) {
                if (minutes > 30 && isRound) {
                    hoursText = numberService.convertThreeDigitsToText(1);
                }
                else {
                    hoursText = numberService.convertThreeDigitsToText(12);
                }
            }
            else {
                let amOrPM = hours;
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
        sessionText(hours, minutes, sessionType, isRound) {
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