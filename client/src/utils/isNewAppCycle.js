/**
 *
 * @param {*} appLog which contain key "appStarted" value of which by default is "false"
 * @returns "true" - App starts new cycle || "false" - App has some progress
 */
export const isNewAppCycle = appLog => {
    let appIsStarted = null;

    if (appLog.appStarted === false) {
        appIsStarted = true;
        appLog.appStarted = true;
        appLog.lastIdFaqMes = 1;

        return appIsStarted;
    }

    if (appLog.appStarted === true) {
        appIsStarted = false;
    }

    return appIsStarted;
};
