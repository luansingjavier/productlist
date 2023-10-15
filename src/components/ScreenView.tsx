import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "./Header";

export interface ScreenViewProps {
  header?: React.ReactNode;
  content: React.ReactNode;
  title?: React.ReactNode;
  noSafeArea?: boolean;
}

const ScreenView: React.FC<ScreenViewProps> = ({
  header,
  content,
  title,
  noSafeArea = false,
}) => {
  const renderHeader = () => {
    if (header) return header;
    return <Header title={title} />;
  };

  const renderContent = () => {
    if (noSafeArea) return <View style={styles.contents}>{content}</View>;
    else return <SafeAreaView style={styles.contents}>{content}</SafeAreaView>;
  };

  return (
    <View style={styles.root}>
      {renderHeader()}
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contents: {
    flex: 1,
    width: "100%",
  },
});

export default ScreenView;
