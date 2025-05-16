// Initialize analytics monitoring and chat functionality
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if analytics data is ready
    function isAnalyticsDataReady() {
        console.log('Checking analytics data:', window.analytics);
        return window.analytics && 
               window.analytics.cart && 
               window.analytics.searchHistory && 
               window.analytics.viewedProducts;
    }

    // Function to initialize bot with current analytics data
    function initializeBotWithAnalytics() {
        console.log('Current analytics state:', window.analytics);
        
        // Get current analytics data
        const currentData = {
            cart: window.analytics.cart,
            searchHistory: window.analytics.searchHistory,
            viewedProducts: window.analytics.viewedProducts,
            lastUpdated: new Date().toISOString()
        };

        console.log('Preparing to initialize bot with data:', currentData);

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
        console.log('Final bot configuration:', KoreChatSDK.chatConfig);

        // Initialize the chat window with the configuration
        window.KoreSDK = {
            chatInstance: new KoreChatSDK.chatWindow()
        };
        window.KoreSDK.chatInstance.show(KoreChatSDK.chatConfig);
    }

    // Function to wait for analytics data
    function waitForAnalytics() {
        if (isAnalyticsDataReady()) {
            console.log('Analytics data is ready, initializing bot...');
            initializeBotWithAnalytics();
        } else {
            console.log('Analytics data not ready, waiting...');
            setTimeout(waitForAnalytics, 500); // Check every 500ms
        }
    }

    // Start waiting for analytics
    console.log('Starting to wait for analytics data...');
    waitForAnalytics();
});