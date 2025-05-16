// Initialize analytics monitoring and chat functionality
document.addEventListener('DOMContentLoaded', function() {
    // Function to get fresh analytics data
    function getFreshAnalytics() {
        // Get the latest analytics data
        const data = {
            cart: window.analytics.cart || [],
            searchHistory: window.analytics.searchHistory || [],
            viewedProducts: window.analytics.viewedProducts || [],
            lastUpdated: new Date().toISOString()
        };
        console.log('Getting fresh analytics data:', data);
        return data;
    }

    // Configure the bot options
    const botOptions = {
        API_KEY_CONFIG: {
            KEY: '9cb93b446f3744c0b678238a901b8aa18f904e3593184563a7e00e53d305ff8cstcd'
        },
        botInfo: {
            name: "Reactive_POC",
            taskBotId: "st-cd7dc0d8-c4e2-58a8-be49-95e0d97dfffd",
            chatBot: "Reactive_POC",
            customData: {} // Initialize empty, will be set when chat opens
        }
    };

    // Configure the chat window
    const chatConfig = {
        botOptions: botOptions,
        events: {
            onOpen: function() {
                // Wait a short moment to ensure analytics is loaded
                setTimeout(() => {
                    const freshData = getFreshAnalytics();
                    console.log('Chat window opened, sending message with latest analytics:', freshData);

                    // Send message with latest data
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
                }, 100); // Small delay to ensure analytics is ready
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

    // Add a function to manually refresh analytics data
    window.refreshBotAnalytics = function() {
        if (window.KoreSDK && window.KoreSDK.chatInstance) {
            const freshData = getFreshAnalytics();
            window.KoreSDK.chatInstance.sendMessage({
                message: {
                    body: "update_analytics"
                },
                botInfo: {
                    chatBot: "Reactive_POC",
                    taskBotId: "st-cd7dc0d8-c4e2-58a8-be49-95e0d97dfffd",
                    customData: freshData
                }
            });
            console.log('Manually refreshed analytics data:', freshData);
        }
    };
});