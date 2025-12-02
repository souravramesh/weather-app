import CalendarMonthIcon from '@/assets/icons/home/calendar-month-icon.svg';
import Colors from '@/constants/Colors';
import { WeatherDaily } from '@/hooks/useWeather';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Circle, Defs, G, LinearGradient, Path, Rect, Stop, Line as SvgLine, Text as SvgText } from 'react-native-svg';
import BoxView from '../common/BoxView';
import StyledText from '../common/StyledText';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 30;
const CHART_HEIGHT = 160;
const PADDING_TOP = 40; // Space for tooltip
const PADDING_BOTTOM = 30;
const PADDING_LEFT = 35; // Space for Y-axis labels
const PADDING_RIGHT = 20;

interface DayForecastCardProps {
    daily: WeatherDaily[];
}

const DayForecastCard = ({ daily }: DayForecastCardProps) => {
    if (!daily || daily.length === 0) {
        return null;
    }

    // Use the first 7 days for the forecast
    const displayData = daily.slice(0, 7);

    // Calculate min and max temps for the y-axis domain based on Max Temp
    const temps = displayData.map(d => d.max);
    const minTemp = Math.min(...temps);
    const maxTemp = Math.max(...temps);

    // Determine the "active" point (e.g., the day with the highest max temp)
    const activeIndex = temps.indexOf(maxTemp);

    const tempRange = maxTemp - minTemp;

    // Add some padding to the domain
    const domainMin = minTemp - (tempRange * 0.2 || 2);
    const domainMax = maxTemp + (tempRange * 0.2 || 2);

    // Create scales
    const scaleX = scale.scaleLinear()
        .domain([0, displayData.length - 1])
        .range([PADDING_LEFT, CARD_WIDTH - 40 - PADDING_RIGHT]);

    const scaleY = scale.scaleLinear()
        .domain([domainMin, domainMax])
        .range([CHART_HEIGHT - PADDING_BOTTOM, PADDING_TOP]);

    // Create line generator
    const lineGenerator = shape.line<WeatherDaily>()
        .x((d, i) => scaleX(i))
        .y(d => scaleY(d.max))
        .curve(shape.curveMonotoneX);

    // Create area generator for gradient fill
    const areaGenerator = shape.area<WeatherDaily>()
        .x((d, i) => scaleX(i))
        .y0(CHART_HEIGHT - PADDING_BOTTOM)
        .y1(d => scaleY(d.max))
        .curve(shape.curveMonotoneX);

    const path = lineGenerator(displayData) || '';
    const area = areaGenerator(displayData) || '';

    // Generate ticks for y-axis
    const yTicks = [
        Math.ceil(maxTemp / 5) * 5, // Round up to nearest 5
        0,
        Math.floor(minTemp / 5) * 5 // Round down to nearest 5
    ].filter((v, i, a) => a.indexOf(v) === i).sort((a, b) => b - a); // Unique and sorted desc

    // Fallback ticks if range is small
    const finalYTicks = yTicks.length >= 2 ? yTicks : [maxTemp, Math.round((maxTemp + minTemp) / 2), minTemp];

    return (
        <BoxView bg={Colors.surface} r={24} p={15} mb={20}>
            <BoxView fd="row" ai="center" mb={10} g={10}>
                <BoxView bg={Colors.white} r={50} p={8}>
                    <CalendarMonthIcon width={14} height={14} />
                </BoxView>
                <StyledText>Day forecast</StyledText>
            </BoxView>

            <BoxView h={CHART_HEIGHT} w="100%" ai="center" jc="center">
                <Svg height={CHART_HEIGHT} width={CARD_WIDTH - 40}>
                    <Defs>
                        <LinearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                            <Stop offset="0" stopColor={Colors.primary} stopOpacity="0.3" />
                            <Stop offset="1" stopColor={Colors.primary} stopOpacity="0.0" />
                        </LinearGradient>
                    </Defs>

                    {/* Y-Axis Grid Lines & Labels */}
                    {finalYTicks.map((tick, index) => (
                        <React.Fragment key={`y-${index}`}>
                            <SvgText
                                x={PADDING_LEFT - 10}
                                y={scaleY(tick) + 4} // Center vertically
                                fontSize="12"
                                fill={Colors.textSecondary}
                                textAnchor="end"
                            >
                                {tick}°
                            </SvgText>
                            <SvgLine
                                x1={PADDING_LEFT}
                                y1={scaleY(tick)}
                                x2={CARD_WIDTH - 40 - PADDING_RIGHT}
                                y2={scaleY(tick)}
                                stroke={Colors.textSecondary}
                                strokeWidth="1"
                                strokeOpacity="0.1"
                            />
                        </React.Fragment>
                    ))}

                    {/* Area Fill */}
                    <Path
                        d={area}
                        fill="url(#areaGradient)"
                    />

                    {/* Chart Line */}
                    <Path
                        d={path}
                        fill="none"
                        stroke={Colors.primary}
                        strokeWidth="2"
                        strokeLinecap="round"
                    />

                    {/* Active Point Highlight (Dashed Line & Tooltip) */}
                    {activeIndex !== -1 && (
                        <>
                            {/* Dashed Line */}
                            <SvgLine
                                x1={scaleX(activeIndex)}
                                y1={scaleY(displayData[activeIndex].max)}
                                x2={scaleX(activeIndex)}
                                y2={CHART_HEIGHT - PADDING_BOTTOM}
                                stroke={Colors.primary}
                                strokeWidth="2"
                                strokeDasharray="4 4"
                            />

                            {/* Active Point Circle */}
                            <Circle
                                cx={scaleX(activeIndex)}
                                cy={scaleY(displayData[activeIndex].max)}
                                r="4"
                                fill={Colors.primary}
                                stroke={Colors.white}
                                strokeWidth="2"
                            />

                            {/* Tooltip Bubble */}
                            <G x={scaleX(activeIndex)} y={scaleY(displayData[activeIndex].max) - 30}>
                                <Rect
                                    x="-20"
                                    y="-15"
                                    width="40"
                                    height="24"
                                    rx="12"
                                    fill={Colors.white}
                                />
                                <SvgText
                                    x="0"
                                    y="2"
                                    fontSize="12"
                                    fontWeight="bold"
                                    fill={Colors.text}
                                    textAnchor="middle"
                                >
                                    {displayData[activeIndex].max}°
                                </SvgText>
                            </G>
                        </>
                    )}

                    {/* X-Axis Labels */}
                    {displayData.map((d, index) => (
                        <SvgText
                            key={`x-${index}`}
                            x={scaleX(index)}
                            y={CHART_HEIGHT - 5}
                            fontSize="12"
                            fill={Colors.text}
                            textAnchor="middle"
                        >
                            {d.date.split(',')[0]}
                        </SvgText>
                    ))}
                </Svg>
            </BoxView>
        </BoxView>
    );
};

export default DayForecastCard;
