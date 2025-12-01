import Colors from '@/constants/Colors';
import React from 'react';
import { ScrollView } from 'react-native';
import BoxView from '../common/BoxView';
import StyledText from '../common/StyledText';

const HourlyForecast = ({ hourly }: { hourly: any[] }) => {
    return (
        <BoxView mx={20} mb={20}>
            <BoxView fd="row" ai="center" mb={15} g={10}>
                <StyledText size={16}>🕒</StyledText>
                <StyledText size={16} weight="500">Hourly forecast</StyledText>
            </BoxView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <BoxView fd="row" g={12}>
                    {hourly?.map((item, index) => (
                        <BoxView key={index} ai="center" bg={index === 0 ? Colors.primary : Colors.surface} r={30} py={15} px={10} w={60}>
                            <StyledText size={12} color={index === 0 ? Colors.white : Colors.textSecondary} mb={10}>{item.time}</StyledText>
                            <StyledText size={20} mb={10}>{item.icon === 'sun' ? '☀️' : '☁️'}</StyledText>
                            <StyledText size={16} weight="500" color={index === 0 ? Colors.white : Colors.textSecondary}>{item.temp}°</StyledText>
                        </BoxView>
                    ))}
                </BoxView>
            </ScrollView>
        </BoxView>
    );
};

export default HourlyForecast;
