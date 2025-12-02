import React from 'react'
import { ColorValue, View } from 'react-native'

type DividerProps = {
    vertical?: boolean,
    width?: number,
    height?: number,
    color?: ColorValue,
    mx?: number
    my?: number
}

const Divider = ({ vertical, width, height, color, mx, my }: DividerProps) => {
    return (
        <View style={{
            width: vertical ? width || 1 : '100%',
            height: vertical ? (height || '100%') : (width || 1),
            backgroundColor: color || 'rgba(10, 10, 10, 0.1)',
            marginHorizontal: mx,
            marginVertical: my
        }} />
    )
}

export default Divider