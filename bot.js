// Initialize analytics monitoring and chat functionality
document.addEventListener('DOMContentLoaded', function() {
    // Configure the bot options
    const botOptions = {
        API_KEY_CONFIG: {
            KEY: '9cb93b446f3744c0b678238a901b8aa18f904e3593184563a7e00e53d305ff8cstcd'
        },
        botInfo: {
            name: "Reactive_POC",
            taskBotId: "st-cd7dc0d8-c4e2-58a8-be49-95e0d97dfffd",
            chatBot: "Reactive_POC",
            customData: {
                cart: window.analytics.cart,
                searchHistory: window.analytics.searchHistory,
                viewedProducts: window.analytics.viewedProducts,
                lastUpdated: new Date().toISOString()
            }
        }
    };

    // Configure the chat window
    const chatConfig = {
        botOptions: botOptions,
        events: {
            onOpen: function() {
                // Get fresh analytics data when chat opens
                const currentData = {
                    cart: window.analytics.cart,
                    searchHistory: window.analytics.searchHistory,
                    viewedProducts: window.analytics.viewedProducts,
                    lastUpdated: new Date().toISOString()
                };

                console.log('Chat window opened, setting analytics data:', currentData);

                // Send message with latest data
                if (window.KoreSDK && window.KoreSDK.chatInstance) {
                    window.KoreSDK.chatInstance.sendMessage({
                        message: {
                            body: "init_conversation"
                        },
                        botInfo: {
                            chatBot: "Reactive_POC",
                            taskBotId: "st-cd7dc0d8-c4e2-58a8-be49-95e0d97dfffd",
                            customData: currentData
                        }
                    });
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