// Initialize analytics monitoring and chat functionality
document.addEventListener('DOMContentLoaded', function() {
    // Function to get fresh analytics data
    function getFreshAnalytics() {
        return {
            cart: window.analytics.cart || [],
            searchHistory: window.analytics.searchHistory || [],
            viewedProducts: window.analytics.viewedProducts || [],
            lastUpdated: new Date().toISOString()
        };
    }

    // Configure the bot options
    const botOptions = {
        API_KEY_CONFIG: {
            KEY: '9cb93b446f3744c0b678238a901b8aa18f904e3593184563a7e00e53d305ff8cstcd'
        },
        botInfo: {
            name: "Reactive_POC",
            taskBotId: "st-cd7dc0d8-c4e2-58a8-be49-95e0d97dfffd",
            chatBot: "Reactive_POC"
        }
    };

    // Configure the chat window
    const chatConfig = {
        botOptions: botOptions
    };

    // Initialize the chat window
    window.KoreSDK = {
        chatInstance: new KoreChatSDK.chatWindow()
    };

    // Override the sendMessage function to include analytics data
    const originalSendMessage = window.KoreSDK.chatInstance.sendMessage;
    window.KoreSDK.chatInstance.sendMessage = function(messageData) {
        const analytics = getFreshAnalytics();
        console.log('Sending message with analytics:', analytics);

        // Ensure botInfo exists
        messageData.botInfo = messageData.botInfo || {};
        
        // Add customData to the message
        messageData.botInfo.customData = analytics;
        messageData.botInfo.chatBot = "Reactive_POC";
        messageData.botInfo.taskBotId = "st-cd7dc0d8-c4e2-58a8-be49-95e0d97dfffd";
        
        // Call the original sendMessage with our modified data
        return originalSendMessage.call(this, messageData);
    };

    // Show chat with configuration
    window.KoreSDK.chatInstance.show(chatConfig);

    // Add a function to manually refresh analytics
    window.refreshBotAnalytics = function() {
        const analytics = getFreshAnalytics();
        console.log('Current analytics data:', analytics);
        
        if (window.KoreSDK && window.KoreSDK.chatInstance) {
            window.KoreSDK.chatInstance.sendMessage({
                message: {
                    body: "refresh_analytics"
                }
            });
        }
    };
});