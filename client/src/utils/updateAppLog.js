/**
 *
 * @param {*} appLog which contain key "appStarted" value of which by default is "false"
 * @returns "true" - App starts new cycle || "false" - App has some progress
 */
export const updateAppLog = appLog => {

    if (appLog.appAtStart === false) {
        appLog.appAtStart = true;
        appLog.lastIdFaqMes = 1;

        return appLog;
    }

    if (appLog.lastIdFaqMes === 2) {
        appLog.lastIdFaqMes = 3;

        return appLog;
    }

    return appLog;
};
