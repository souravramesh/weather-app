import CalendarMonthIcon from '@/assets/icons/home/calendar-month-icon.svg';
import Colors from '@/constants/Colors';
import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Circle, Line, Path, Text as SvgText } from 'react-native-svg';
import BoxView from '../common/BoxView';
import StyledText from '../common/StyledText';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CHART_HEIGHT = 100;

const DayForecastCard = ({ data }: { data: any }) => {
    // Simple mock path for the chart
    // In a real app, use d3-shape to generate this path from data
    const path = `M 20 ${CHART_HEIGHT - 20} C 60 ${CHART_HEIGHT - 60}, 100 ${CHART_HEIGHT - 40}, 140 ${CHART_HEIGHT - 80} S 220 ${CHART_HEIGHT - 40}, 260 ${CHART_HEIGHT - 60} S 300 ${CHART_HEIGHT - 20}, 340 ${CHART_HEIGHT - 40}`;

    return (
        <BoxView bg={Colors.surface} r={24} p={15} mb={20}>
            <BoxView fd="row" ai="center" mb={20} g={10}>
                <BoxView bg={Colors.white} r={50} p={8}>
                    <CalendarMonthIcon width={14} height={14} />
                </BoxView>
                <StyledText>Day forecast</StyledText>
            </BoxView>

            <BoxView h={CHART_HEIGHT} w="100%" ai="center" jc="center">
                <Svg height={CHART_HEIGHT} width={CARD_WIDTH - 40}>
                    {/* Grid lines (optional) */}
                    <Line x1="0" y1={CHART_HEIGHT / 2} x2="100%" y2={CHART_HEIGHT / 2} stroke={Colors.textSecondary} strokeOpacity={0.1} />

                    {/* Chart Line */}
                    <Path
                        d={path}
                        fill="none"
                        stroke={Colors.textSecondary}
                        strokeWidth="2"
                    />

                    {/* Active Point (Mock) */}
                    <Circle cx="140" cy={CHART_HEIGHT - 80} r="4" fill={Colors.textSecondary} />
                    <Line x1="140" y1={CHART_HEIGHT - 80} x2="140" y2={CHART_HEIGHT} stroke={Colors.primary} strokeDasharray="4 4" />

                    {/* Labels (Mock) */}
                    <SvgText x="140" y={CHART_HEIGHT - 90} fontSize="12" fill={Colors.textSecondary} textAnchor="middle">3°</SvgText>
                </Svg>
            </BoxView>

            <BoxView fd="row" jc="space-between" mt={10}>
                {['Mon', 'Tue', 'Wen', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <StyledText key={index} size={12} color={Colors.textSecondary} opacity={0.7}>{day}</StyledText>
                ))}
            </BoxView>
        </BoxView>
    );
};

export default DayForecastCard;
