import React from 'react';

import OneSignal from 'react-onesignal';

export const PushNotification = () => {
    const appId = process.env.REACT_APP_PUSH_NOTIFICATION_APP_ID;

    React.useEffect(() => {
        if (appId)
            OneSignal?.init({
                appId
            });
        OneSignal.on('subscriptionChange', function (isSubscribed) {
            console.log("The user's subscription state is now:", isSubscribed);
        });
    }, []);

    const f = {
        textAlign: 'red'
    };
    return (
        <>
            <div
                className="onesignal-customlink-container"
                style={{ ...f }}
            ></div>
        </>
    );
};
