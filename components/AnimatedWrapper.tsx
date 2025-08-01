import React, { ReactNode, useEffect } from "react";
import { Animated, StyleSheet, ViewStyle } from "react-native";

interface Props {
  children: ReactNode;
  style?: ViewStyle;
  animationType?: "fadeIn" | "slideUp";
  duration?: number;
}

const AnimatedWrapper: React.FC<Props> = ({
  children,
  style,
  animationType = "fadeIn",
  duration = 500,
}) => {
  const opacity = new Animated.Value(animationType === "fadeIn" ? 0 : 1);
  const translateY = new Animated.Value(animationType === "slideUp" ? 20 : 0);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();

    if (animationType === "slideUp") {
      Animated.timing(translateY, {
        toValue: 0,
        duration,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity,
          transform: animationType === "slideUp" ? [{ translateY }] : [],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedWrapper;
