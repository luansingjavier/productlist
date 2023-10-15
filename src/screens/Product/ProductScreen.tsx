import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import Product, { ProductProps } from "./components/Product";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { debounce } from "lodash";
import ScreenView from "../../components/ScreenView";
import Header from "../../components/Header";
import Input from "../../components/Input";
import Colors from "../../styles/colors";
import { ParamList } from "../../navigation/RootNavigator";
import { readProducts } from "../../api/products";

const ProductScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamList>>();
  const [products, setProducts] = useState();
  const [isLoading, setLoading] = useState<boolean>(false);

  const navigateToAddProductScreen = () => navigation.navigate("AddProduct");

  const navigateToProductDetailScreen = (item: ProductProps) =>
    navigation.navigate("ProductDetail", { details: item });

  const getProducts = async (text: string = "") => {
    setLoading(true);
    const data = await readProducts(text);
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getProducts();
    });

    return unsubscribe;
  }, [navigation]);

  const onSearch = debounce((text: string) => {
    getProducts(text);
  }, 700);

  const product = ({ item }: { item: ProductProps }) => (
    <Product
      onPress={() => navigateToProductDetailScreen(item)}
      name={item.name}
      description={item.description}
      price={item.price}
    />
  );

  const getHeader = () => {
    return (
      <Header
        backButtonHidden
        title={"Product List"}
        right={
          <TouchableOpacity
            onPress={navigateToAddProductScreen}
            style={styles.button}
          >
            <Text style={styles.add}>+ Add</Text>
          </TouchableOpacity>
        }
      />
    );
  };

  const getContent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.search}>
          <Input label="Search" onChangeText={onSearch} />
        </View>
        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item: any) => `${item.name}`}
          renderItem={product}
          refreshing={!products}
          refreshControl={
            <RefreshControl refreshing={isLoading} onRefresh={getProducts} />
          }
        />
      </View>
    );
  };

  return <ScreenView noSafeArea header={getHeader()} content={getContent()} />;
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.seaShell,
  },
  add: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 10,
  },
  button: {
    position: "absolute",
    bottom: 5,
    right: 15,
    backgroundColor: Colors.greenSheen,
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
    alignSelf: "flex-end",
  },
  search: {
    marginVertical: 4,
    borderRadius: 4,
    backgroundColor: Colors.white,
    padding: 16,
  },
});
