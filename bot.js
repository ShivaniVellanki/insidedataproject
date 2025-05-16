// Initialize analytics monitoring and chat functionality
document.addEventListener('DOMContentLoaded', function() {
    // Configure the bot options
    KoreChatSDK.chatConfig.botOptions.API_KEY_CONFIG.KEY = '9cb93b446f3744c0b678238a901b8aa18f904e3593184563a7e00e53d305ff8cstcd';

    // Track user activity data
    let userActivityData = {
        pageVisits: 1,
        currentPage: window.location.pathname,
        timeSpent: 0,
        cartItems: [], // Will be populated when available
        searchHistory: [], // Will be populated when available
        lastActivity: Date.now()
    };

    // Update session page visits
    if (sessionStorage.getItem('pageVisits')) {
        userActivityData.pageVisits = parseInt(sessionStorage.getItem('pageVisits')) + 1;
        sessionStorage.setItem('pageVisits', userActivityData.pageVisits);
    } else {
        sessionStorage.setItem('pageVisits', 1);
    }

    // Initialize customData in bot configuration
    KoreChatSDK.chatConfig.botOptions.botInfo = KoreChatSDK.chatConfig.botOptions.botInfo || {};
    KoreChatSDK.chatConfig.botOptions.botInfo.customData = userActivityData;

    // Function to update user activity data
    function updateUserActivityData(newData) {
        Object.assign(userActivityData, newData);
        // Update the bot's custom data
        KoreChatSDK.chatConfig.botOptions.botInfo.customData = userActivityData;
    }

    // Add event listener for when chat window opens
    KoreChatSDK.chatConfig.events = {
        onOpen: function() {
            // Get latest analytics data when chat opens
            const currentAnalytics = window.getAnalytics();
            
            // Merge analytics with user activity data
            userActivityData = {
                ...userActivityData,
                ...currentAnalytics,
                lastOpened: Date.now()
            };

            // Update bot's custom data with latest information
            KoreChatSDK.chatConfig.botOptions.botInfo.customData = userActivityData;
            console.log('Sending current analytics and user data to bot:', userActivityData);
        }
    };

    // Initialize the chat window
    window.KoreSDK = {
        chatInstance: new KoreChatSDK.chatWindow()
    };
    window.KoreSDK.chatInstance.show(KoreChatSDK.chatConfig);

    // Monitor user activity
    let idleTime = 0;
    setInterval(() => {
        userActivityData.timeSpent++;
        // Update customData with latest timeSpent
        KoreChatSDK.chatConfig.botOptions.botInfo.customData = userActivityData;
    }, 1000);

    // Reset idle time on user activity
    document.addEventListener('mousemove', () => {
        idleTime = 0;
        userActivityData.lastActivity = Date.now();
        // Update customData with latest activity
        KoreChatSDK.chatConfig.botOptions.botInfo.customData = userActivityData;
    });

    // Track idle time
    setInterval(() => {
        idleTime++;
        if (idleTime > 30) { // 30 seconds idle
            userActivityData.isActive = false;
        } else {
            userActivityData.isActive = true;
        }
        // Update customData with latest idle state
        KoreChatSDK.chatConfig.botOptions.botInfo.customData = userActivityData;
    }, 1000);
});