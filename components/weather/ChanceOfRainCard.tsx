import RainIcon from '@/assets/icons/stats/rain-icon.svg';
import Colors from '@/constants/Colors';
import { WeatherHourly } from '@/types/weather';
import React from 'react';
import { View } from 'react-native';
import BoxView from '../common/BoxView';
import FlexView from '../common/FlexView';
import StyledText from '../common/StyledText';

interface ChanceOfRainCardProps {
    hourly: WeatherHourly[];
}

const ChanceOfRainCard = ({ hourly }: ChanceOfRainCardProps) => {
    // Take the next 4 hours
    const data = hourly.slice(0, 4);

    return (
        <BoxView bg={Colors.surface} r={24} p={15}>
            <BoxView fd="row" ai="center" mb={20} g={10}>
                <BoxView bg={Colors.white} r={50} p={8}>
                    <RainIcon width={14} height={14} />
                </BoxView>
                <StyledText>Chance of rain</StyledText>
            </BoxView>

            <BoxView g={15}>
                {data.map((item, index) => (
                    <BoxView key={index} fd="row" ai="center" jc="space-between">
                        <StyledText w={50}>{item.time}</StyledText>

                        <FlexView h={24} bg={Colors.white} r={12} mx={10} ov="hidden">
                            <View style={{ width: `${item.precipProb}%`, height: '100%', backgroundColor: Colors.primary }} />
                        </FlexView>

                        <StyledText w={40} align="right">{item.precipProb}%</StyledText>
                    </BoxView>
                ))}
            </BoxView>
        </BoxView>
    );
};

export default ChanceOfRainCard;
