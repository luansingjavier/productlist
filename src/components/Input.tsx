import React, { FC } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  Platform,
} from "react-native";
import Colors from "../styles/colors";

const isAndroid = Platform.OS === "android";
interface InputProps extends TextInputProps {
  label?: string;
}

const Input: FC<InputProps> = ({ label, ...otherProps }) => {
  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput style={styles.input} placeholder={label} {...otherProps} />
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  label: {
    fontSize: 11,
    fontWeight: "400",
    letterSpacing: 1,
    color: Colors.dimGray,
  },
  input: {
    borderRadius: 8,
    borderWidth: 1,
    paddingVertical: isAndroid ? 5 : 12,
    paddingHorizontal: 12,
    borderColor: Colors.quickSilver,
    marginVertical: 8,
  },
});
