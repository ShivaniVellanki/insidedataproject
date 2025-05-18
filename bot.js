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
            jwtUrl: "https://mk2r2rmj21.execute-api.us-east-1.amazonaws.com/dev/users/sts"
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

function sendAnalyticsToBot(retries = 5, delay = 300) {
    const updatedAnalytics = getAnalytics();

    if (KoreChatSDK.chatWindowInstance) {
        const message = {
            type: "text",
            val: `__updateAnalytics__:${JSON.stringify(updatedAnalytics)}`
        };
        KoreChatSDK.chatWindowInstance.sendMessage(message);
    } else if (retries > 0) {
        console.warn("Bot not initialized yet. Retrying...");
        setTimeout(() => sendAnalyticsToBot(retries - 1, delay), delay);
    } else {
        console.error("Bot failed to initialize after retries.");
    }
}
