import Colors from "@/constants/Colors";
import React from "react";
import {
    AnimatableNumericValue,
    ColorValue,
    Text,
    TextProps,
} from "react-native";

const FontWeight = {
    "100": "Roboto_100Thin",
    "200": "Roboto_200ExtraLight",
    "300": "Roboto_300Light",
    "400": "Roboto_400Regular",
    "500": "Roboto_500Medium",
    "600": "Roboto_600SemiBold",
    "700": "Roboto_700Bold",
    "800": "Roboto_800ExtraBold",
    "900": "Roboto_900Black",
};

type StyledTextProps = {
    size?: number;
    weight?: keyof typeof FontWeight;
    color?: ColorValue;
    opacity?: AnimatableNumericValue;
    align?: "auto" | "left" | "right" | "center" | "justify";
    decoration?: "none" | "underline" | "line-through" | "underline line-through";
    line?: number;
} & TextProps;

const StyledText = ({
    children,
    style,
    size = 14,
    weight = "400",
    color = Colors.text,
    align,
    opacity,
    decoration,
    line = size * 1.2,
    ...props
}: StyledTextProps) => {
    return (
        <Text
            style={[
                {
                    fontSize: size,
                    fontFamily: FontWeight[weight],
                    color: color,
                    opacity: opacity,
                    textAlign: align,
                    textDecorationLine: decoration,
                    lineHeight: line,
                },
                style,
            ]}
            {...props}
        >
            {children}
        </Text>
    );
};

export default StyledText;