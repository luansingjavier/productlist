import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductScreen from "../screens/Product/ProductScreen";
import ProductDetailScreen from "../screens/Product/ProductDetailScreen";
import { ProductProps } from "../screens/Product/components/Product";
import AddProductScreen from "../screens/Product/AddProductScreen";

export type ParamList = {
  Product: undefined;
  ProductDetail: { details: ProductProps };
  AddProduct: undefined;
};

const Stack = createNativeStackNavigator<ParamList>();

const RootStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
      <Stack.Screen
        options={{ presentation: "modal", headerShown: false }}
        name="AddProduct"
        component={AddProductScreen}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
