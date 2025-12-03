import SunriseIcon from '@/assets/icons/home/sunrise-icon.svg';
import SunsetIcon from '@/assets/icons/home/sunset-icon.svg';
import { WeatherDaily } from '@/types/weather';
import React from 'react';
import BoxView from '../common/BoxView';
import StatCard from './StatCard';

interface SunTimesProps {
    today: WeatherDaily;
}

const SunTimes = ({ today }: SunTimesProps) => {
    if (!today) return null;

    const getRelativeTime = (timeStr: string) => {
        const time = new Date(timeStr).getTime();
        const now = new Date().getTime();
        const diffInHours = Math.round((time - now) / (1000 * 60 * 60));

        if (diffInHours === 0) return 'now';
        if (diffInHours > 0) return `in ${diffInHours}h`;
        return `${Math.abs(diffInHours)}h ago`;
    };

    return (
        <BoxView fd="row" fw="wrap" jc="space-between" my={16} g={12}>
            <StatCard
                label="Sunrise"
                value={today.sunrise}
                Icon={SunriseIcon}
                subValue={getRelativeTime(today.sunriseRaw)}
            />
            <StatCard
                label="Sunset"
                value={today.sunset}
                Icon={SunsetIcon}
                subValue={getRelativeTime(today.sunsetRaw)}
            />
        </BoxView>
    );
};

export default SunTimes;
