import Colors from '@/constants/Colors';
import React from 'react';
import BoxView from '../common/BoxView';
import StyledText from '../common/StyledText';

const TenDayForecast = ({ daily }: { daily: any[] }) => {
    return (
        <BoxView mx={20} mb={40}>
            {daily?.map((item, index) => (
                <BoxView key={index} bg={Colors.surface} r={20} p={15} mb={10} fd="row" ai="center" jc="space-between">
                    <BoxView>
                        <StyledText size={16} weight="500" color={Colors.textSecondary}>{item.day}, {item.date}</StyledText>
                        <StyledText size={14} color={Colors.textSecondary} opacity={0.7}>{item.condition}</StyledText>
                    </BoxView>

                    <BoxView fd="row" ai="center" g={15}>
                        <BoxView ai="flex-end">
                            <StyledText size={16} weight="500" color={Colors.textSecondary}>{item.high}°</StyledText>
                            <StyledText size={14} color={Colors.textSecondary} opacity={0.7}>{item.low}°</StyledText>
                        </BoxView>
                        <StyledText size={24}>
                            {item.condition.includes('Sunny') ? '☀️' : '☁️'}
                        </StyledText>
                        <StyledText size={16} color={Colors.textSecondary}>⌄</StyledText>
                    </BoxView>
                </BoxView>
            ))}
        </BoxView>
    );
};

export default TenDayForecast;
