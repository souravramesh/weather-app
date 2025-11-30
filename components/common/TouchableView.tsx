import React from "react";
import {
    TouchableOpacity,
    TouchableOpacityProps
} from "react-native";
import { BoxViewProps } from "./BoxView";

export type TouchableViewProps = BoxViewProps & Omit<TouchableOpacityProps, "style">;

const TouchableView = ({ style, ...props }: TouchableViewProps) => {
    return (
        <TouchableOpacity
            style={[
                style,
                {
                    width: props.w,
                    height: props.h,
                    padding: props.p,
                    margin: props.m,
                    paddingHorizontal: props.px,
                    paddingVertical: props.py,
                    marginHorizontal: props.mx,
                    marginVertical: props.my,
                    borderRadius: props.r,
                    backgroundColor: props.bg,
                    marginTop: props.mt,
                    marginBottom: props.mb,
                    marginLeft: props.ml,
                    marginRight: props.mr,
                    paddingTop: props.pt,
                    paddingBottom: props.pb,
                    paddingLeft: props.pl,
                    paddingRight: props.pr,
                    flexDirection: props.fd,
                    justifyContent: props.jc,
                    alignItems: props.ai,
                    alignContent: props.ac,
                    alignSelf: props.as,
                    gap: props.g,
                    borderWidth: props.bw,
                    borderColor: props.bco,
                    overflow: props.ov,
                    display: props.d,
                    position: props.po,
                    top: props.to,
                    bottom: props.bo,
                    left: props.le,
                    right: props.ri,
                    opacity: props.op,
                },
            ]}
            {...props}
        />
    );
};

export default TouchableView;
