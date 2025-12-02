import Colors from '@/constants/Colors';
import { getWeatherCondition } from '@/utils/getWeatherCondition';
import { getWeatherIcon } from '@/utils/getWeatherIcon';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Animated, {
    Extrapolation,
    SharedValue,
    interpolate,
    interpolateColor,
    useAnimatedStyle,
    useDerivedValue,
} from 'react-native-reanimated';
import BoxView from '../common/BoxView';
import StyledText from '../common/StyledText';
import Header from './Header';
import SegmentedTabs, { TabType } from './SegmentedTabs';

interface HeroSectionProps {
    scrollY: SharedValue<number>;
    weather: any; // Type this properly if needed
    locationName: string | null;
    onSearchPress: () => void;
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
}

const HERO_HEIGHT = 380;

const HeroSection = ({ scrollY, weather, locationName, onSearchPress, activeTab, onTabChange }: HeroSectionProps) => {
    const containerStyle = useAnimatedStyle(() => {
        const height = interpolate(
            scrollY.value,
            [0, 250],
            [HERO_HEIGHT, 200],
            Extrapolation.CLAMP
        );
        const borderRadius = interpolate(
            scrollY.value,
            [0, 250],
            [30, 0],
            Extrapolation.CLAMP
        );

        return {
            height,
            borderBottomLeftRadius: borderRadius,
            borderBottomRightRadius: borderRadius,
        };
    });

    const contentStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [0, 150],
            [1, 0],
            Extrapolation.CLAMP
        );
        const translateY = interpolate(
            scrollY.value,
            [0, 150],
            [0, -50],
            Extrapolation.CLAMP
        );

        return {
            opacity,
            transform: [{ translateY }],
        };
    });

    const smallHeaderStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [150, 200],
            [0, 1],
            Extrapolation.CLAMP
        );
        return {
            opacity,
            pointerEvents: opacity === 0 ? 'none' : 'auto', // Disable touches when hidden
        };
    });

    const bgImageStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            scrollY.value,
            [150, 200],
            [1, 0],
            Extrapolation.CLAMP
        );
        return {
            opacity,
        };
    });

    // Animate header text color from white to black
    const headerTextColor = useDerivedValue(() => {
        return interpolateColor(
            scrollY.value,
            [150, 200],
            [Colors.white, Colors.text]
        );
    });

    return (
        <Animated.View style={[styles.container, containerStyle]}>
            {/* Background Image */}
            <Animated.Image
                source={require('@/assets/images/hero-bg.png')}
                style={[styles.bgImageStyle, bgImageStyle]}
                resizeMode="cover"
            />

            <Header locationName={locationName} textColor={headerTextColor} onSearchPress={onSearchPress} />

            {/* Main Content */}
            <Animated.View style={[styles.content, contentStyle]}>
                <BoxView fd="row" jc="space-between" ai='flex-end'>
                    <BoxView g={10} ai='center'>
                        <StyledText size={90} line={70} color={Colors.white}>{weather?.current?.temp}°</StyledText>
                        <StyledText size={16} color={Colors.white}>Feels like {weather?.current?.feelsLike}°</StyledText>
                    </BoxView>
                    <BoxView ai='center'>
                        <Image
                            source={getWeatherIcon(weather?.current?.weatherCode)}
                            style={{ width: 100, height: 100 }}
                            resizeMode="contain"
                        />
                        <StyledText size={18} color={Colors.white}>{getWeatherCondition(weather?.current?.weatherCode)}</StyledText>
                    </BoxView>
                </BoxView>

                <BoxView fd="row" jc="space-between" ai='flex-end'>
                    <StyledText size={16} color={Colors.white}>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, {new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })}</StyledText>

                    <BoxView ai='flex-end' g={5}>
                        <StyledText size={16} weight='700' color={Colors.white}>Max {weather?.daily?.[0]?.max}°</StyledText>
                        <StyledText size={16} weight='700' color={Colors.white}>Min {weather?.daily?.[0]?.min}°</StyledText>
                    </BoxView>
                </BoxView>
            </Animated.View>

            {/* Small Header (Visible on scroll) */}
            <Animated.View style={[styles.smallHeader, smallHeaderStyle]}>
                <BoxView fd="row" jc="space-between" ai='center'>
                    <BoxView fd="row" ai='flex-end'>
                        <StyledText size={50} line={40} weight="500" color={Colors.textSecondary}>{weather?.current?.temp}°</StyledText>
                        <StyledText color={Colors.textSecondary}>Feels like {weather?.current?.feelsLike}°</StyledText>
                    </BoxView>
                    <Image
                        source={getWeatherIcon(weather?.current?.weatherCode)}
                        style={{ width: 60, height: 60 }}
                        resizeMode="contain"
                    />
                </BoxView>
                <SegmentedTabs activeTab={activeTab} onTabChange={onTabChange} />
            </Animated.View>

        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        overflow: 'hidden',
        backgroundColor: "#E1D3FA", // Fallback
    },
    content: {
        flex: 1,
        paddingHorizontal: 23,
        paddingVertical: 16,
        justifyContent: "space-between",
        marginTop: 24,
    },
    smallHeader: {
        paddingHorizontal: 23,
        gap: 18,
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 14,
    },
    bgImageStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        height: '100%',
    },
});

export default HeroSection;
