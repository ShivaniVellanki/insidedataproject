// Initialize analytics monitoring and chat functionality
document.addEventListener('DOMContentLoaded', function() {
    // Configure the bot options
    KoreChatSDK.chatConfig.botOptions = KoreChatSDK.chatConfig.botOptions || {};
    KoreChatSDK.chatConfig.botOptions.API_KEY_CONFIG.KEY = '9cb93b446f3744c0b678238a901b8aa18f904e3593184563a7e00e53d305ff8cstcd';

    // Add event listener for when chat window opens
    KoreChatSDK.chatConfig.events = {
        onOpen: function() {
            // Get the latest analytics data when chat opens
            const currentData = {
                cart: window.analytics.cart,
                searchHistory: window.analytics.searchHistory,
                viewedProducts: window.analytics.viewedProducts,
                lastUpdated: new Date().toISOString()
            };

            console.log('Chat window opened, setting analytics data:', currentData);

            // Set the customData when chat opens
            KoreChatSDK.chatConfig.botOptions.customData = currentData;
            KoreChatSDK.chatConfig.botOptions.botInfo = KoreChatSDK.chatConfig.botOptions.botInfo || {};
            KoreChatSDK.chatConfig.botOptions.botInfo.customData = currentData;
            KoreChatSDK.chatConfig.customData = currentData;

            // Update the bot instance with the fresh data
            if (window.KoreSDK && window.KoreSDK.chatInstance) {
                window.KoreSDK.chatInstance.updateBotInfo({
                    customData: currentData
                });
            }
        }
    };

    // Initialize the chat window
    window.KoreSDK = {
        chatInstance: new KoreChatSDK.chatWindow()
    };
    window.KoreSDK.chatInstance.show(KoreChatSDK.chatConfig);
});