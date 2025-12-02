import Colors from '@/constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Animated, { SharedValue, useAnimatedProps, useAnimatedStyle } from 'react-native-reanimated'
import BoxView from '../common/BoxView'

// Create animated version of Ionicons
const AnimatedIonicons = Animated.createAnimatedComponent(Ionicons)

interface HeaderProps {
    locationName: string | null
    textColor?: SharedValue<string>
    onSearchPress: () => void
}

export default function Header ({ locationName, textColor, onSearchPress }: HeaderProps) {
    const animatedTextStyle = useAnimatedStyle(() => ({
        color: textColor?.value || Colors.white,
    }))

    const animatedIconProps = useAnimatedProps(() => ({
        color: textColor?.value || Colors.white,
    }))

    return (
        <BoxView fd="row" jc="space-between" ai="center" px={23} mt={16}>
            <Animated.Text style={[{ fontSize: 20, fontFamily: 'Inter_400Regular' }, animatedTextStyle]}>
                {locationName || 'Loading...'}
            </Animated.Text>
            <TouchableOpacity onPress={onSearchPress}>
                <AnimatedIonicons
                    name="search-sharp"
                    size={22}
                    animatedProps={animatedIconProps}
                />
            </TouchableOpacity>
        </BoxView>
    )
}