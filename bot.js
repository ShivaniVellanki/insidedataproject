// Initialize analytics monitoring and chat functionality
document.addEventListener('DOMContentLoaded', function() {
    // Configure the bot options
    KoreChatSDK.chatConfig.botOptions.API_KEY_CONFIG.KEY = '9cb93b446f3744c0b678238a901b8aa18f904e3593184563a7e00e53d305ff8cstcd';

    // Initialize customData in bot configuration using analytics from script.js
    KoreChatSDK.chatConfig.botOptions.botInfo = KoreChatSDK.chatConfig.botOptions.botInfo || {};
    KoreChatSDK.chatConfig.botOptions.botInfo.customData = {
        cart: window.analytics.cart,
        searchHistory: window.analytics.searchHistory,
        viewedProducts: window.analytics.viewedProducts,
        lastUpdated: window.analytics.lastUpdated
    };

    // Add event listener for when chat window opens
    KoreChatSDK.chatConfig.events = {
        onOpen: function() {
            // Update customData with latest analytics when chat opens
            KoreChatSDK.chatConfig.botOptions.botInfo.customData = {
                cart: window.analytics.cart,
                searchHistory: window.analytics.searchHistory,
                viewedProducts: window.analytics.viewedProducts,
                lastUpdated: new Date().toISOString()
            };
            console.log('Sending current analytics to bot:', KoreChatSDK.chatConfig.botOptions.botInfo.customData);
        }
    };

    // Initialize the chat window
    window.KoreSDK = {
        chatInstance: new KoreChatSDK.chatWindow()
    };
    window.KoreSDK.chatInstance.show(KoreChatSDK.chatConfig);
});