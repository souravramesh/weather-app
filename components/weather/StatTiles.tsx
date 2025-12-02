import PressureIcon from '@/assets/icons/stats/pressure-icon.svg';
import RainIcon from '@/assets/icons/stats/rain-icon.svg';
import WindIcon from '@/assets/icons/stats/wind-icon.svg';
import React from 'react';
import BoxView from '../common/BoxView';
import StatCard from './StatCard';

const StatTiles = ({ stats }: { stats: { windSpeed: number; precipProb: number; humidity: number; pressure: number } }) => {
    const items = [
        { label: 'Wind speed', value: `${stats?.windSpeed} km/h`, Icon: WindIcon },
        { label: 'Rain chance', value: `${stats?.precipProb}%`, Icon: RainIcon },
        { label: 'Humidity', value: `${stats?.humidity}%`, Icon: RainIcon },
        { label: 'Pressure', value: `${stats?.pressure} hPa`, Icon: PressureIcon },
    ];

    return (
        <BoxView fd="row" fw="wrap" jc="space-between" my={16} g={12}>
            {items.map((item, index) => (
                <StatCard
                    key={index}
                    label={item.label}
                    value={item.value}
                    Icon={item.Icon}
                />
            ))}
        </BoxView >
    );
};

export default StatTiles;
