import Colors from '@/constants/Colors';
import { getWeatherIcon } from '@/utils/getWeatherIcon';
import Entypo from '@expo/vector-icons/Entypo';
import React from 'react';
import { Image } from 'react-native';
import BoxView from '../common/BoxView';
import Divider from '../common/Divider';
import StyledText from '../common/StyledText';

const TenDayForecast = ({ daily }: { daily: any[] }) => {
    return (
        <BoxView>
            {daily?.map((item, index) => (
                <BoxView key={index} bg={Colors.surface} r={20} p={15} mb={18} fd="row" ai="center" jc="space-between">
                    <BoxView g={5}>
                        <StyledText size={16}>{item.day}, {item.date}</StyledText>
                        <StyledText size={16} color={Colors.textSecondary} opacity={0.7}>{item.condition}</StyledText>
                    </BoxView>

                    <BoxView fd="row" ai="center" g={12}>
                        <BoxView ai="flex-end" g={5}>
                            <StyledText size={16} color={Colors.text}>{item.high}°</StyledText>
                            <StyledText size={16} color={Colors.text}>{item.low}°</StyledText>
                        </BoxView>
                        <Divider vertical height={40} />
                        <Image
                            source={getWeatherIcon(item.weatherCode)}
                            style={{ width: 50, height: 50 }}
                            resizeMode="contain"
                        />
                        <BoxView bg={Colors.white} r={50}>
                            <Entypo name="chevron-small-down" size={20} color="black" />
                        </BoxView>
                    </BoxView>
                </BoxView>
            ))}
        </BoxView>
    );
};

export default TenDayForecast;
