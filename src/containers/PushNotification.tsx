import React from 'react';

import OneSignal from 'react-onesignal';

import { SUBSCRIBE_EVENT } from 'Enum';
import { useSubscribe } from 'hooks/apiHooks/worker';
import Grid from '@mui/material/Grid';

interface Props {
    shortcode?: string;
}

export const PushNotification = ({ shortcode }: Props) => {
    const appId = process.env.REACT_APP_PUSH_NOTIFICATION_APP_ID;

    const subscribe = useSubscribe();

    const onSubscribe = (event: SUBSCRIBE_EVENT, playerId: string) => {
        if (shortcode)
            subscribe.mutate({
                event,
                shortcode,
                playerId
            });
    };

    React.useEffect(() => {
        if (appId) {
            OneSignal?.init({
                appId
            });
        }

        OneSignal.on('subscriptionChange', function (isSubscribed) {
            OneSignal.getUserId().then((userId?: string | null | undefined) => {
                if (userId) {
                    if (isSubscribed) {
                        onSubscribe(SUBSCRIBE_EVENT.SUBSCRIBED, userId);
                    } else onSubscribe(SUBSCRIBE_EVENT.UNSUBSCRIBED, userId);
                }
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Grid item md={12} display="flex" justifyContent="center">
            <div
                style={{ textAlign: 'center' }}
                className="onesignal-customlink-container"
            ></div>
        </Grid>
    );
};
