import React from "react";
import {
  StyleProp,
  StyleSheet,
  ViewStyle,
  View,
  Text,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Colors from "../styles/colors";

const isAndroid = Platform.OS === "android";
export interface CustomHeaderProps {
  style?: StyleProp<ViewStyle>;
  title?: React.ReactNode;
  left?: React.ReactNode;
  right?: React.ReactNode;
  hasOverlap?: boolean;
  backButtonHidden?: boolean;
}

const Header: React.FC<CustomHeaderProps> = ({
  style,
  title,
  left,
  right,
  backButtonHidden = false,
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.header, style]}>
      {navigation.canGoBack() && !backButtonHidden ? (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.back}
        >
          <Image
            style={styles.leftArrow}
            source={require("../assets/icons/left-arrow.png")}
          />
        </TouchableOpacity>
      ) : (
        left
      )}
      <Text style={styles.title}>{title}</Text>
      {right && right}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: isAndroid ? 80 : 120,
    alignItems: "center",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    backgroundColor: Colors.beer,
  },
  back: {
    position: "absolute",
    left: 20,
    bottom: 20,
    width: 18,
    height: 18,
  },
  leftArrow: {
    width: "100%",
    height: "100%",
  },
  title: {
    position: "absolute",
    bottom: 20,
    fontWeight: "600",
    fontSize: 15,
    color: Colors.white,
  },
});

export default Header;
