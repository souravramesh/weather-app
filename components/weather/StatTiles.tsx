import PressureIcon from '@/assets/icons/stats/pressure-icon.svg';
import RainIcon from '@/assets/icons/stats/rain-icon.svg';
import UvIcon from '@/assets/icons/stats/uv-icon.svg';
import WindIcon from '@/assets/icons/stats/wind-icon.svg';
import Colors from '@/constants/Colors';
import React from 'react';
import BoxView from '../common/BoxView';
import StyledText from '../common/StyledText';

const StatTiles = ({ stats }: { stats: any }) => {
    const items = [
        { label: 'Wind speed', value: stats?.windSpeed, Icon: WindIcon, sub: '2 km/h' },
        { label: 'Rain chance', value: stats?.rainChance, Icon: RainIcon, sub: '10%' },
        { label: 'Pressure', value: stats?.pressure, Icon: PressureIcon, sub: '32 hpa' },
        { label: 'UV Index', value: stats?.uvIndex, Icon: UvIcon, sub: '0.3' },
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
                        <StyledText size={11} color={Colors.text} weight='500' style={{ position: 'absolute', right: 15, bottom: 15 }}>{item.sub}</StyledText>
                    </BoxView>
                );
            })}
        </BoxView >
    );
};

export default StatTiles;
