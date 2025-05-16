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
                cart: [
                    {
                        "id": 1,
                        "name": "Premium Notebook",
                        "price": 12.99,
                        "image": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500",
                        "quantity": 1
                    },
                    {
                        "id": 3,
                        "name": "Desk Organizer",
                        "price": 24.99,
                        "image": "https://images.unsplash.com/photo-1583485088034-697b5bc36b60?w=500",
                        "quantity": 1
                    },
                    {
                        "id": 4,
                        "name": "Sticky Notes",
                        "price": 4.99,
                        "image": "https://images.unsplash.com/photo-1583485088034-697b5bc36b60?w=500",
                        "quantity": 1
                    }
                ],
                searchHistory: [],
                viewedProducts: [1, 2, 3, 4, 5, 6],
                lastUpdated: "2025-05-16T18:47:22.845Z"
            }
        }
    };

    // Configure the chat window
    const chatConfig = {
        botOptions: botOptions,
        events: {
            onOpen: function() {
                // Use the same hard-coded test data when chat opens
                const currentData = {
                    cart: [
                        {
                            "id": 1,
                            "name": "Premium Notebook",
                            "price": 12.99,
                            "image": "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=500",
                            "quantity": 1
                        },
                        {
                            "id": 3,
                            "name": "Desk Organizer",
                            "price": 24.99,
                            "image": "https://images.unsplash.com/photo-1583485088034-697b5bc36b60?w=500",
                            "quantity": 1
                        },
                        {
                            "id": 4,
                            "name": "Sticky Notes",
                            "price": 4.99,
                            "image": "https://images.unsplash.com/photo-1583485088034-697b5bc36b60?w=500",
                            "quantity": 1
                        }
                    ],
                    searchHistory: [],
                    viewedProducts: [1, 2, 3, 4, 5, 6],
                    lastUpdated: "2025-05-16T18:47:22.845Z"
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