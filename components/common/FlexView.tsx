import React from "react";
import { StyleSheet } from "react-native";
import BoxView, { BoxViewProps } from "./BoxView";

type FlexViewProps = {} & BoxViewProps;

const FlexView = ({ style, ...props }: FlexViewProps) => {
    return (
        <BoxView
            style={[
                {
                    flex: 1,
                },
                style,
            ]}
            {...props}
        />
    );
};

export default FlexView;

const styles = StyleSheet.create({});
