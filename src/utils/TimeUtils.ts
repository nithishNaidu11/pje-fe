import moment, { Moment } from 'moment';

type AddSubtract = {
    date: Date | string;
    period: string | number;
    unit: 'days' | 'months' | 'years';
};
export const TimeUtils = {
    format: (date: Moment | string | Date, format: string): string => {
        return moment(date).format(format);
    },
    add: ({ date, period, unit = 'days' }: AddSubtract): Moment => {
        return moment(date).add(period, unit);
    },
    subtract: ({ date, period, unit = 'days' }: AddSubtract): Moment => {
        return moment(date).subtract(period, unit);
    },
    getMoment: (dateString: string) => {
        if (!dateString) {
            return '';
        }
        return moment(dateString);
    },
    getDate: (dateString: string) => {
        if (!dateString) {
            return '';
        }
        return moment(dateString, 'YYYY-MM-DD').toDate();
    },
    getDateByFormat: (dateString: string, format: string) => {
        if (!dateString) {
            return '';
        }
        return moment(dateString, format).toDate();
    },
    timeSince: (date: string) => {
        const utcMoment = moment.utc(date);
        return moment(utcMoment).local().fromNow();
    }
};
