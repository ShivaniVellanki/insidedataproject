document.addEventListener('DOMContentLoaded', function () {
    const insideData = getAnalytics();

    // Inject analytics into customData
    koreSDK.chatConfig.botOptions.botInfo.customData = insideData;

    // Show chat window
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

