// Initialize analytics monitoring and chat functionality
document.addEventListener('DOMContentLoaded', function() {
    // Configure the bot options
    const botOptions = {
        API_KEY_CONFIG: {
            KEY: '9cb93b446f3744c0b678238a901b8aa18f904e3593184563a7e00e53d305ff8cstcd'
        },
        // Initialize with empty customData
        botInfo: {
            customData: {}
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

                // Update the bot session with fresh data
                if (window.KoreSDK && window.KoreSDK.chatInstance) {
                    window.KoreSDK.chatInstance.botInfo = window.KoreSDK.chatInstance.botInfo || {};
                    window.KoreSDK.chatInstance.botInfo.customData = currentData;
                    
                    // Send message to update bot session
                    window.KoreSDK.chatInstance.sendMessage({
                        message: {
                            body: "__updateBotInfo",
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