import RainIcon from '@/assets/icons/stats/rain-icon.svg';
import Colors from '@/constants/Colors';
import React from 'react';
import { View } from 'react-native';
import BoxView from '../common/BoxView';
import FlexView from '../common/FlexView';
import StyledText from '../common/StyledText';

const ChanceOfRainCard = () => {
    const data = [
        { time: '7 PM', chance: 27 },
        { time: '8 PM', chance: 44 },
        { time: '9 PM', chance: 56 },
        { time: '10 PM', chance: 88 },
    ];

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
                        <StyledText size={14} w={50}>{item.time}</StyledText>

                        <FlexView h={24} bg={Colors.white} r={12} mx={10} ov="hidden">
                            <View style={{ width: `${item.chance}%`, height: '100%', backgroundColor: Colors.primary }} />
                        </FlexView>

                        <StyledText size={14} w={40} align="right">{item.chance}%</StyledText>
                    </BoxView>
                ))}
            </BoxView>
        </BoxView>
    );
};

export default ChanceOfRainCard;
