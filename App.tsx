import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import RootStack from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <>
      <StatusBar style="auto" backgroundColor="transparent" />
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    </>
  );
}
