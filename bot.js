document.addEventListener('DOMContentLoaded', function () {
    const insideData = getAnalytics();

    KoreChatSDK.chatConfig.botOptions.botInfo.customData = insideData;

    // Show the bot
    KoreChatSDK.chatWindowInstance = new KoreChatSDK.chatWindow().show(KoreChatSDK.chatConfig);
});

function sendAnalyticsToBot() {
    const updatedAnalytics = getAnalytics();

    const message = {
        type: "text",
        val: `__updateAnalytics__:${JSON.stringify(updatedAnalytics)}`
    };

    if (KoreChatSDK.chatWindowInstance) {
        KoreChatSDK.chatWindowInstance.sendMessage(message);
    } else {
        console.warn("Bot not initialized yet. Skipping analytics send.");
    }
}
