import Colors from '@/constants/Colors';
import { getWeatherCondition } from '@/utils/getWeatherCondition';
import { getWeatherIcon } from '@/utils/getWeatherIcon';
import React from 'react';
import { Image } from 'react-native';
import BoxView from '../common/BoxView';
import Divider from '../common/Divider';
import StyledText from '../common/StyledText';

const TenDayForecast = ({ daily }: { daily: any[] }) => {
    return (
        <BoxView pt={20}>
            {daily?.map((item, index) => (
                <BoxView key={index} bg={Colors.surface} r={20} p={15} mb={18} fd="row" ai="center" jc="space-between">
                    <BoxView g={5}>
                        <StyledText size={16}>{item.date}</StyledText>
                        <StyledText color={Colors.textSecondary} opacity={0.7}>
                            {getWeatherCondition(item.weatherCode)}
                        </StyledText>
                    </BoxView>

                    <BoxView fd="row" ai="center" g={12}>
                        <BoxView ai="flex-end" g={5}>
                            <StyledText color={Colors.text}>{item.max}°</StyledText>
                            <StyledText color={Colors.text}>{item.min}°</StyledText>
                        </BoxView>
                        <Divider vertical height={40} />
                        <Image
                            source={getWeatherIcon(item.weatherCode)}
                            style={{ width: 50, height: 50 }}
                            resizeMode="contain"
                        />
                    </BoxView>
                </BoxView>
            ))}
        </BoxView>
    );
};

export default TenDayForecast;
