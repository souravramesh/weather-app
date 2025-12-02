import ClockIcon from '@/assets/icons/home/clock-icon.svg';
import Colors from '@/constants/Colors';
import { WeatherHourly } from '@/types/weather';
import { getWeatherIcon } from '@/utils/getWeatherIcon';
import React from 'react';
import { Image, ScrollView } from 'react-native';
import BoxView from '../common/BoxView';
import StyledText from '../common/StyledText';

const HourlyForecast = ({ hourly }: { hourly: WeatherHourly[] }) => {
    return (
        <BoxView mb={16} bg={Colors.surface} r={18} p={16}>
            <BoxView fd="row" ai="center" mb={15} g={10}>
                <BoxView bg={Colors.white} r={50} p={8}>
                    <ClockIcon width={16} height={16} />
                </BoxView>
                <StyledText>Hourly forecast</StyledText>
            </BoxView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 30 }}>
                {hourly?.map((item, index) => (
                    <BoxView key={index} ai="center" g={5}>
                        <StyledText size={13}>{item.time}</StyledText>
                        <Image
                            source={getWeatherIcon(item.weatherCode)}
                            style={{ width: 26, height: 26 }}
                            resizeMode="contain"
                        />
                        <StyledText size={18}>{item.temp}°</StyledText>
                    </BoxView>
                ))}
            </ScrollView>
        </BoxView>
    );
};

export default HourlyForecast;
