import PressureIcon from '@/assets/icons/stats/pressure-icon.svg';
import RainIcon from '@/assets/icons/stats/rain-icon.svg';
import WindIcon from '@/assets/icons/stats/wind-icon.svg';
import Colors from '@/constants/Colors';
import React from 'react';
import BoxView from '../common/BoxView';
import StyledText from '../common/StyledText';

const StatTiles = ({ stats }: { stats: { windSpeed: number; precipProb: number; humidity: number; pressure: number } }) => {
    const items = [
        { label: 'Wind speed', value: `${stats?.windSpeed} km/h`, Icon: WindIcon },
        { label: 'Rain chance', value: `${stats?.precipProb}%`, Icon: RainIcon },
        { label: 'Humidity', value: `${stats?.humidity}%`, Icon: RainIcon },
        { label: 'Pressure', value: `${stats?.pressure} hPa`, Icon: PressureIcon },
    ];

    return (
        <BoxView fd="row" fw="wrap" jc="space-between" my={16} g={12}>
            {items.map((item, index) => {
                const IconComponent = item.Icon;
                return (
                    <BoxView fd='row' key={index} w="48%" bg={Colors.surface} r={16} p={15} g={8} ai='center' >
                        <BoxView bg={Colors.white} ai="center" jc="center" h={30} w={30} r={50}>
                            <IconComponent width={16} height={16} color={Colors.textSecondary} />
                        </BoxView>
                        <BoxView g={5}>
                            <StyledText color={Colors.textSecondary}>{item.label}</StyledText>
                            <StyledText size={16} color={Colors.textSecondary}>{item.value}</StyledText>
                        </BoxView>
                    </BoxView>
                );
            })}
        </BoxView >
    );
};

export default StatTiles;
