import React, { FC } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Image,
} from "react-native";
import Colors from "../../../styles/colors";

const { width, height } = Dimensions.get("window");

type IngredientModalProps = {
  data: any;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
};

const IngredientModal: FC<IngredientModalProps> = ({
  data,
  modalVisible,
  setModalVisible,
}) => (
  <View style={styles.container}>
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <View style={styles.modal}>
        <View style={styles.inner}>
          <View style={styles.header}>
            <Text style={styles.title}>Ingredient</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Image
                style={styles.close}
                source={require("../../../assets/icons/close.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>Name</Text>
            <Text style={styles.value}>{data.name}</Text>
            <Text style={styles.title}>UOM</Text>
            <Text style={styles.value}>{data.uom}</Text>
            <Text style={styles.title}>Description</Text>
            <Text style={styles.value}>{data.description}</Text>
            <Text style={styles.title}>Quantity</Text>
            <Text style={styles.value}>{data.quantity}</Text>
          </View>
        </View>
      </View>
    </Modal>
  </View>
);

export default IngredientModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 11,
    fontWeight: "400",
    letterSpacing: 1,
    color: Colors.dimGray,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inner: {
    backgroundColor: Colors.white,
    padding: 16,
    width: width / 1.1,
    borderRadius: 4,
    shadowColor: "rgba(0, 0, 0, 0.50)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  value: {
    marginVertical: 8,
    fontSize: 12,
    fontWeight: "400",
    color: Colors.black,
  },
  content: {
    marginVertical: 20,
  },
  button: {
    width: 20,
    height: 20,
  },
  close: {
    width: "100%",
    height: "100%",
    tintColor: Colors.black,
  },
});
