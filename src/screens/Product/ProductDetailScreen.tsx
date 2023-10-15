import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { ProductProps } from "./components/Product";
import ScreenView from "../../components/ScreenView";
import IngredientModal from "./components/IngredientModal";
import Colors from "../../styles/colors";

const ProductDetailScreen = () => {
  const route = useRoute();
  const {
    details: { name, description, price, ingredients },
  } = route.params as { details: ProductProps };
  const [modalData, setModalData] = useState();
  const [isVisible, setModalVisible] = useState(false);

  const getContent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{name}</Text>
          <Text style={styles.label}>Description</Text>
          <Text style={styles.value}>{description}</Text>
          <Text style={styles.label}>Price</Text>
          <Text style={[styles.value, styles.price]}>{`$ ${price}`}</Text>
        </View>

        <View style={styles.card}>
          <Text style={[styles.label, { marginBottom: 8 }]}>Ingredients</Text>
          {ingredients.map((item: any, index: number, allIngredients) => (
            <TouchableOpacity
              onPress={() => {
                setModalData(allIngredients[index]);
                setModalVisible(!isVisible);
              }}
              key={index}
            >
              <Text style={styles.ingredients}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <IngredientModal
          data={modalData ?? []}
          modalVisible={isVisible}
          setModalVisible={setModalVisible}
        />
      </View>
    );
  };

  return (
    <ScreenView noSafeArea title={"Product Details"} content={getContent()} />
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.seaShell,
  },
  card: {
    marginVertical: 8,
    borderRadius: 4,
    backgroundColor: Colors.white,
    padding: 16,
  },
  label: {
    fontSize: 11,
    fontWeight: "400",
    letterSpacing: 1,
    color: Colors.dimGray,
  },
  value: {
    marginVertical: 8,
    fontSize: 12,
    fontWeight: "400",
    color: Colors.black,
  },
  ingredients: {
    marginVertical: 4,
    fontSize: 12,
    fontWeight: "400",
    color: Colors.black,
  },
  price: {
    alignSelf: "flex-end",
  },
});
