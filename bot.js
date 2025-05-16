// Initialize analytics monitoring and chat functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get initial analytics data
    const currentData = {
        cart: window.analytics.cart,
        searchHistory: window.analytics.searchHistory,
        viewedProducts: window.analytics.viewedProducts,
        lastUpdated: new Date().toISOString()
    };

    // Configure the bot options
    const botOptions = {
        API_KEY_CONFIG: {
            KEY: '9cb93b446f3744c0b678238a901b8aa18f904e3593184563a7e00e53d305ff8cstcd'
        },
        botInfo: {
            name: "Reactive_POC",
            taskBotId: "st-cd7dc0d8-c4e2-58a8-be49-95e0d97dfffd",
            chatBot: "Reactive_POC",
            customData: currentData
        }
    };

    // Configure the chat window
    const chatConfig = {
        botOptions: botOptions,
        events: {
            onOpen: function() {
                console.log('Chat window opened, sending initial message with customData');
                
                // Get fresh analytics data
                const freshData = {
                    cart: window.analytics.cart,
                    searchHistory: window.analytics.searchHistory,
                    viewedProducts: window.analytics.viewedProducts,
                    lastUpdated: new Date().toISOString()
                };

                // Send an initial message with customData
                if (window.KoreSDK && window.KoreSDK.chatInstance) {
                    window.KoreSDK.chatInstance.sendMessage({
                        message: {
                            body: "init_conversation"
                        },
                        botInfo: {
                            chatBot: "Reactive_POC",
                            taskBotId: "st-cd7dc0d8-c4e2-58a8-be49-95e0d97dfffd",
                            customData: freshData
                        }
                    });
                }
            },
            onMessage: function(message) {
                // Update customData on each message if needed
                if (window.analytics && window.KoreSDK.chatInstance) {
                    const latestData = {
                        cart: window.analytics.cart,
                        searchHistory: window.analytics.searchHistory,
                        viewedProducts: window.analytics.viewedProducts,
                        lastUpdated: new Date().toISOString()
                    };

                    window.KoreSDK.chatInstance.botInfo.customData = latestData;
                }
            }
        }
    };

    // Initialize the chat window
    window.KoreSDK = {
        chatInstance: new KoreChatSDK.chatWindow()
    };

    // Show chat with configuration
    window.KoreSDK.chatInstance.show(chatConfig);
});