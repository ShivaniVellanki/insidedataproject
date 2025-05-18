window.addEventListener('load', function () {
    waitForKoreSDK().then(() => {
        const insideData = getAnalytics();
        koreSDK.chatConfig.botOptions.botInfo.customData = insideData;
        new KoreChatWindow(koreSDK.chatConfig).show();
    });
});

function sendAnalyticsToBot() {
    waitForKoreSDK().then(() => {
        const updatedAnalytics = getAnalytics();
        const message = {
            type: "text",
            val: `__updateAnalytics__:${JSON.stringify(updatedAnalytics)}`
        };
        koreSDK.chatWindowInstance.sendMessage(message);
    });
}

function waitForKoreSDK(retries = 20, delay = 100) {
    return new Promise((resolve, reject) => {
        (function check() {
            if (typeof koreSDK !== "undefined") {
                resolve();
            } else if (retries === 0) {
                reject("koreSDK not available");
            } else {
                setTimeout(() => {
                    retries--;
                    check();
                }, delay);
            }
        })();
    });
}
