// Initialize analytics monitoring and chat functionality
document.addEventListener('DOMContentLoaded', function() {
    // Function to update bot with latest analytics
    function updateBotWithLatestAnalytics() {
        const currentData = {
            cart: window.analytics.cart,
            searchHistory: window.analytics.searchHistory,
            viewedProducts: window.analytics.viewedProducts,
            lastUpdated: new Date().toISOString()
        };

        console.log('Updating bot with latest analytics:', currentData);

        // Update bot configuration
        KoreChatSDK.chatConfig.botOptions = KoreChatSDK.chatConfig.botOptions || {};
        KoreChatSDK.chatConfig.botOptions.API_KEY_CONFIG.KEY = '9cb93b446f3744c0b678238a901b8aa18f904e3593184563a7e00e53d305ff8cstcd';
        
        KoreChatSDK.chatConfig.botOptions.customData = currentData;
        KoreChatSDK.chatConfig.botOptions.botInfo = {
            customData: currentData
        };
        KoreChatSDK.chatConfig.customData = currentData;

        // If chat instance exists, destroy and reinitialize with new data
        if (window.KoreSDK && window.KoreSDK.chatInstance) {
            window.KoreSDK.chatInstance.destroy();
            window.KoreSDK.chatInstance = new KoreChatSDK.chatWindow();
            window.KoreSDK.chatInstance.show(KoreChatSDK.chatConfig);
        }
    }

    // Set up analytics change observer
    let lastAnalyticsState = JSON.stringify(window.analytics);
    
    // Check for analytics changes every 1 second
    setInterval(() => {
        const currentAnalyticsState = JSON.stringify(window.analytics);
        if (currentAnalyticsState !== lastAnalyticsState) {
            console.log('Analytics changed, updating bot...');
            console.log('Previous state:', JSON.parse(lastAnalyticsState));
            console.log('New state:', window.analytics);
            lastAnalyticsState = currentAnalyticsState;
            updateBotWithLatestAnalytics();
        }
    }, 1000);

    // Initialize bot with current analytics
    updateBotWithLatestAnalytics();

    // Also update when chat window opens
    KoreChatSDK.chatConfig.events = {
        onOpen: function() {
            console.log('Chat window opened, updating with latest analytics...');
            updateBotWithLatestAnalytics();
        }
    };

    // Initialize the chat window
    window.KoreSDK = {
        chatInstance: new KoreChatSDK.chatWindow()
    };
    window.KoreSDK.chatInstance.show(KoreChatSDK.chatConfig);
});