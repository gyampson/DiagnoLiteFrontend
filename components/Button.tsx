import React from "react";
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator, ViewStyle, TextStyle, View } from "react-native";
import Colors from "@/constants/colors";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  loading = false,
  style,
  textStyle,
  testID,
  icon,
}) => {
  const getButtonStyle = () => {
    let buttonStyle: ViewStyle = {};
    
    // Variant styles
    if (variant === "primary") {
      buttonStyle.backgroundColor = Colors.primary;
    } else if (variant === "secondary") {
      buttonStyle.backgroundColor = Colors.secondary;
    } else if (variant === "outline") {
      buttonStyle.backgroundColor = "transparent";
      buttonStyle.borderWidth = 2;
      buttonStyle.borderColor = Colors.primary;
    }
    
    // Size styles
    if (size === "small") {
      buttonStyle.paddingVertical = 8;
      buttonStyle.paddingHorizontal = 16;
    } else if (size === "medium") {
      buttonStyle.paddingVertical = 12;
      buttonStyle.paddingHorizontal = 24;
    } else if (size === "large") {
      buttonStyle.paddingVertical = 16;
      buttonStyle.paddingHorizontal = 32;
    }
    
    // Disabled state
    if (disabled) {
      buttonStyle.opacity = 0.5;
    }
    
    return buttonStyle;
  };
  
  const getTextStyle = () => {
    let textStyleObj: TextStyle = {};
    
    if (variant === "outline") {
      textStyleObj.color = Colors.primary;
    } else {
      textStyleObj.color = Colors.white;
    }
    
    if (size === "small") {
      textStyleObj.fontSize = 14;
    } else if (size === "medium") {
      textStyleObj.fontSize = 16;
    } else if (size === "large") {
      textStyleObj.fontSize = 18;
    }
    
    return textStyleObj;
  };

  return (
    <TouchableOpacity
      style={[styles.button, getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      testID={testID}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === "outline" ? Colors.primary : Colors.white} 
        />
      ) : (
        <>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
          <Text style={[styles.text, getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  text: {
    fontWeight: "600",
    textAlign: "center",
  },
  iconContainer: {
    marginRight: 8,
  },
});

export default Button;