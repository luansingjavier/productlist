import React from "react";
import { Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Colors from "../../../styles/colors";

export type ingredientProps = {
  name: string;
  uom: string;
  description: string;
  quantity: number;
};
export interface ProductProps {
  name: string;
  description: string;
  price: number;
  ingredients?: ingredientProps[];
  onPress?: () => void;
}

const Product: React.FC<ProductProps> = ({
  name,
  description,
  price,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        style={{ alignSelf: "flex-end" }}
        source={require("../../../assets/icons/arrow-forward.png")}
      />
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>{`$ ${price}`}</Text>
    </TouchableOpacity>
  );
};

export default Product;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    backgroundColor: Colors.white,
    marginVertical: 4,
    padding: 16,
  },
  title: { fontSize: 14, fontWeight: "600" },
  description: {
    fontSize: 12,
    fontWeight: "400",
    color: Colors.dimGray,
    marginVertical: 8,
  },
  price: {
    fontWeight: "400",
    color: Colors.black,
    alignSelf: "flex-end",
  },
});
