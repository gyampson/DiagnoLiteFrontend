import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Check } from "lucide-react-native";
import Colors from "@/constants/colors";

interface SymptomCheckboxProps {
  label: string;
  isSelected: boolean;
  onToggle: () => void;
  testID?: string;
}

const SymptomCheckbox: React.FC<SymptomCheckboxProps> = ({
  label,
  isSelected,
  onToggle,
  testID,
}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onToggle}
      testID={testID}
    >
      <View
        style={[
          styles.checkbox,
          isSelected ? styles.checkboxSelected : styles.checkboxUnselected,
        ]}
      >
        {isSelected && <Check size={16} color={Colors.white} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.cardBackground,
    borderRadius: 8,
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  checkboxUnselected: {
    backgroundColor: Colors.white,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  checkboxSelected: {
    backgroundColor: Colors.primary,
    borderWidth: 0,
  },
  label: {
    fontSize: 16,
    color: Colors.text,
  },
});

export default SymptomCheckbox;