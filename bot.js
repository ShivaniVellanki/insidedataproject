window.addEventListener('load', function () {
    const insideData = getAnalytics();
    koreSDK.chatConfig.botOptions.botInfo.customData = insideData;
    new KoreChatWindow(koreSDK.chatConfig).show();
});


function sendAnalyticsToBot() {
    const updatedAnalytics = getAnalytics();

    const message = {
        type: "text",
        val: `__updateAnalytics__:${JSON.stringify(updatedAnalytics)}`
    };

    koreSDK.chatWindowInstance.sendMessage(message);
}

