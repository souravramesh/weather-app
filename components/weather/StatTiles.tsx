import Colors from '@/constants/Colors';
import React from 'react';
import BoxView from '../common/BoxView';
import StyledText from '../common/StyledText';

const StatTiles = ({ stats }: { stats: any }) => {
    const items = [
        { label: 'Wind speed', value: stats?.windSpeed, icon: '💨', sub: '2 km/h' },
        { label: 'Rain chance', value: stats?.rainChance, icon: '🌧️', sub: '10%' },
        { label: 'Pressure', value: stats?.pressure, icon: '♨️', sub: '32 hpa' },
        { label: 'UV Index', value: stats?.uvIndex, icon: '☀️', sub: '0.3' },
    ];

    return (
        <BoxView fd="row" fw="wrap" jc="space-between" mx={20} mb={20} g={15}>
            {items.map((item, index) => (
                <BoxView key={index} w="47%" bg={Colors.surface} r={24} p={15}>
                    <BoxView fd="row" ai="center" mb={10} g={10}>
                        <StyledText size={20}>{item.icon}</StyledText>
                        <StyledText size={14} color={Colors.textSecondary}>{item.label}</StyledText>
                    </BoxView>
                    <StyledText size={16} weight="500" color={Colors.textSecondary}>{item.value}</StyledText>
                    <StyledText size={12} color={Colors.textSecondary} opacity={0.6} mt={5}> {item.sub}</StyledText>
                </BoxView>
            ))}
        </BoxView>
    );
};

export default StatTiles;
