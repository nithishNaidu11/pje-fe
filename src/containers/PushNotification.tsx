import React from 'react';

import OneSignal from 'react-onesignal';

export const PushNotification = () => {
    const appId = process.env.REACT_APP_ONE_SIGNAL_APP_ID;

    React.useEffect(() => {
        if (appId)
            OneSignal?.init({
                appId
            }).then(() => {
                OneSignal.showSlidedownPrompt();
            });
        OneSignal.on('subscriptionChange', function (isSubscribed) {
            console.log("The user's subscription state is now:", isSubscribed);
        });
    }, []);
    return <></>;
};
