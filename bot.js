// Wait for analytics to be available
document.addEventListener('DOMContentLoaded', function() {
    console.log('Analytics object before getting:', window.analytics);
    let insideData = getAnalytics();
    console.log('Analytics data retrieved:', insideData);
    
    // Configure the bot to capture analytics before showing chat
    KoreChatSDK.chatConfig.botOptions.API_KEY_CONFIG.KEY = '9cb93b446f3744c0b678238a901b8aa18f904e3593184563a7e00e53d305ff8cstcd';

    // Add event listener for when chat window opens
    KoreChatSDK.chatConfig.events = {
        onOpen: function() {
            // Get latest analytics data when chat opens
            const currentAnalytics = window.getAnalytics();
            console.log('Current analytics when chat opens:', currentAnalytics);
            KoreChatSDK.chatConfig.botOptions.botInfo.customData = currentAnalytics;
        }
    };

    // Initialize the chat window
    new KoreChatSDK.chatWindow().show(KoreChatSDK.chatConfig);
});