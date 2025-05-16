// Initialize analytics monitoring and chat functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get current analytics data
    const currentData = {
        cart: window.analytics.cart,
        searchHistory: window.analytics.searchHistory,
        viewedProducts: window.analytics.viewedProducts,
        lastUpdated: new Date().toISOString()
    };

    // Configure the bot options with analytics data
    KoreChatSDK.chatConfig.botOptions = KoreChatSDK.chatConfig.botOptions || {};
    KoreChatSDK.chatConfig.botOptions.API_KEY_CONFIG.KEY = '9cb93b446f3744c0b678238a901b8aa18f904e3593184563a7e00e53d305ff8cstcd';
    
    // Set customData at all possible locations where the bot might look for it
    KoreChatSDK.chatConfig.botOptions.customData = currentData;
    KoreChatSDK.chatConfig.botOptions.botInfo = {
        customData: currentData
    };
    KoreChatSDK.chatConfig.customData = currentData;

    // Log the complete configuration
    console.log('Bot configuration with custom data:', KoreChatSDK.chatConfig);

    // Add event listener for when chat window opens
    KoreChatSDK.chatConfig.events = {
        onOpen: function() {
            console.log('Chat window opened with configuration:', KoreChatSDK.chatConfig);
        }
    };

    // Initialize the chat window with the configuration
    window.KoreSDK = {
        chatInstance: new KoreChatSDK.chatWindow()
    };
    window.KoreSDK.chatInstance.show(KoreChatSDK.chatConfig);

    // Add a function to manually refresh data
    window.refreshBotData = function() {
        const currentData = {
            cart: window.analytics.cart,
            searchHistory: window.analytics.searchHistory,
            viewedProducts: window.analytics.viewedProducts,
            lastUpdated: new Date().toISOString()
        };

        if (window.KoreSDK && window.KoreSDK.chatInstance) {
            KoreChatSDK.chatConfig.botOptions.botInfo.customData = currentData;
            window.KoreSDK.chatInstance.updateBotInfo({
                customData: currentData
            });
            window.KoreSDK.chatInstance.sendMessage({
                message: {
                    type: 'session_update',
                    customData: currentData
                }
            });
            console.log('Manually updated bot session with data:', currentData);
        }
    };
});