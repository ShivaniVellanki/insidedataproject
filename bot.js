window.addEventListener('load', function () {
    const insideData = getAnalytics();

    // Configure bot settings
    KoreChatSDK.chatConfig = {
        botOptions: {
            clientId: "cs-de247d47-4b00-54b7-9261-eddaa39a754e",
            botInfo: {
                name: "Reactive_POC",
                _id: "st-cd7dc0d8-c4e2-58a8-be49-95e0d97dfffd",
                customData: insideData
            },
            allowGoogleSpeech: false,
            isSendButton: true,
            koreAPIUrl: "https://bots.kore.ai/api/",
            jwtUrl: "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts"  // optional if using JWT
        },
        chatContainer: {
            isPopup: true,
            cssNames: {
                header: "chat-header",
                chatWindow: "chat-window"
            }
        }
    };

    // Initialize and show chat window
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
        console.warn("Bot not initialized yet.");
    }
}
