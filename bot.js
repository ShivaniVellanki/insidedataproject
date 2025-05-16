// Initialize analytics monitoring and chat functionality
document.addEventListener('DOMContentLoaded', function() {
    // Configure the bot options
    KoreChatSDK.chatConfig.botOptions.API_KEY_CONFIG.KEY = '9cb93b446f3744c0b678238a901b8aa18f904e3593184563a7e00e53d305ff8cstcd';

    // Add event listener for when chat window opens
    KoreChatSDK.chatConfig.events = {
        onOpen: function() {
            // Force update the bot session with current analytics
            const currentData = {
                cart: window.analytics.cart,
                searchHistory: window.analytics.searchHistory,
                viewedProducts: window.analytics.viewedProducts,
                lastUpdated: new Date().toISOString()
            };

            // Update bot session directly
            if (window.KoreSDK && window.KoreSDK.chatInstance) {
                // Update the bot configuration
                KoreChatSDK.chatConfig.botOptions.botInfo.customData = currentData;
                
                // Force update the bot session
                window.KoreSDK.chatInstance.updateBotInfo({
                    customData: currentData
                });

                // Additional attempt to update session
                window.KoreSDK.chatInstance.sendMessage({
                    message: {
                        type: 'session_update',
                        customData: currentData
                    }
                });

                console.log('Forcing bot session update with data:', currentData);
            }
        }
    };

    // Initialize the chat window
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