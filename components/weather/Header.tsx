import Colors from '@/constants/Colors'
import { WeatherData } from '@/hooks/useWeather'
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import Animated, { SharedValue, useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated'
import BoxView from '../common/BoxView'

// Create animated version of Ionicons
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons)

interface HeaderProps {
    weather: WeatherData
    textColor?: SharedValue<string>
}

export default function Header ({ weather, textColor }: HeaderProps) {
    const animatedTextStyle = useAnimatedStyle(() => ({
        color: textColor?.value || Colors.white,
    }))

    const animatedIconProps = useAnimatedProps(() => ({
        color: textColor?.value || Colors.white,
    }))

    return (
        <BoxView fd="row" jc="space-between" ai="center" px={23} mt={16}>
            <Animated.Text style={[{ fontSize: 22, fontFamily: 'Roboto_400Regular' }, animatedTextStyle]}>
                {weather?.current?.location}
            </Animated.Text>
            <AnimatedIonicons
                name="search-sharp"
                size={24}
                animatedProps={animatedIconProps}
            />
        </BoxView>
    )
}