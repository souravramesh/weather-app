import React from "react";
import {
  ColorValue,
  DimensionValue,
  View,
  ViewProps,
  ViewStyle
} from "react-native";

export type BoxViewProps = {
  w?: DimensionValue;
  h?: DimensionValue;
  p?: number;
  m?: number;
  px?: number;
  py?: number;
  mx?: number;
  my?: number;
  r?: number;
  bg?: ColorValue;
  g?: number;
  mt?: number;
  mb?: number;
  ml?: number;
  mr?: number;
  pt?: number;
  pb?: number;
  pl?: number;
  pr?: number;
  fd?: ViewStyle["flexDirection"];
  jc?: ViewStyle["justifyContent"];
  ac?: ViewStyle["alignContent"];
  ai?: ViewStyle["alignItems"];
  as?: ViewStyle["alignSelf"];
  bw?: number;
  bco?: ColorValue;
  ov?: ViewStyle["overflow"];
  d?: ViewStyle["display"];
  po?: ViewStyle["position"];
  to?: number;
  bo?: number;
  le?: number;
  ri?: number;
  op?: ViewStyle["opacity"];
  fw?: ViewStyle["flexWrap"];
} & ViewProps;

const BoxView = ({ style, ...props }: BoxViewProps) => {
  return (
    <View
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
          flexWrap: props.fw,
        },
      ]}
      {...props}
    />
  );
};

export default BoxView;