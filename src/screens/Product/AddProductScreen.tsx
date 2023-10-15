import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import {
  SubmitHandler,
  useForm,
  Controller,
  useFieldArray,
  DefaultValues,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ScreenView from "../../components/ScreenView";
import Input from "../../components/Input";
import Colors from "../../styles/colors";
import { updateProducts } from "../../api/products";
import { useNavigation } from "@react-navigation/native";

const validationSchema = yup
  .object()
  .shape({
    name: yup.string().label("Name").required(),
    description: yup.string().label("Description").required(),
    price: yup.number().label("Price").min(1).required(),
    ingredients: yup.array().of(
      yup.object().shape({
        name: yup.string().label("Name").required(),
        uom: yup.string().label("UOM").required(),
        description: yup.string().label("Description").required(),
        quantity: yup.number().label("Quantity").min(1).required(),
      })
    ),
  })
  .defined();

type AddProductFormValues = yup.InferType<typeof validationSchema>;

const AddProductScreen = () => {
  const navigation = useNavigation();
  const initialValues: DefaultValues<AddProductFormValues> = {
    name: "",
    description: "",
    price: 0,
    ingredients: [{ name: "", uom: "", description: "", quantity: 0 }],
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<AddProductFormValues>({
    defaultValues: initialValues,
    resolver: yupResolver(validationSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "ingredients",
  });

  const onSubmit: SubmitHandler<AddProductFormValues> = async (value) => {
    updateProducts(value);
    navigation.goBack();
  };

  const removeIngredient = (index: number) => {
    remove(index);
  };

  const addIngredient = () =>
    append({ name: "", uom: "", description: "", quantity: 0 });

  const ingredientCard = (item: any, index: number) => {
    return (
      <View key={item.id} style={styles.card}>
        <TouchableOpacity onPress={() => removeIngredient(index)}>
          <Image
            style={{ alignSelf: "flex-end" }}
            source={require("../../assets/icons/close.png")}
          />
        </TouchableOpacity>
        <Controller
          name={`ingredients[${index}].name` as any}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              label={"Name"}
              onChangeText={onChange}
              returnKeyType={"next"}
              value={value?.toString()}
            />
          )}
        />
        {errors.ingredients?.[index]?.name && (
          <Text
            style={styles.errorText}
          >{`${errors.ingredients?.[index]?.name?.message}`}</Text>
        )}
        <Controller
          name={`ingredients[${index}].uom` as any}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              label={"UOM"}
              onChangeText={onChange}
              returnKeyType={"next"}
              value={value?.toString()}
            />
          )}
        />
        {errors.ingredients?.[index]?.uom && (
          <Text
            style={styles.errorText}
          >{`${errors.ingredients?.[index]?.uom?.message}`}</Text>
        )}
        <Controller
          name={`ingredients[${index}].description` as any}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              style={styles.textArea}
              multiline
              textAlignVertical="top"
              label={"Description"}
              onChangeText={onChange}
              returnKeyType={"next"}
              value={value?.toString()}
            />
          )}
        />
        {errors.ingredients?.[index]?.description && (
          <Text
            style={styles.errorText}
          >{`${errors.ingredients?.[index]?.description?.message}`}</Text>
        )}
        <Controller
          name={`ingredients[${index}].quantity` as any}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Input
              label={"Quantity"}
              onChangeText={onChange}
              returnKeyType={"next"}
              value={value?.toString()}
            />
          )}
        />
        {errors.ingredients?.[index]?.quantity && (
          <Text
            style={styles.errorText}
          >{`${errors.ingredients?.[index]?.quantity?.message}`}</Text>
        )}
      </View>
    );
  };

  const getContent = () => {
    return (
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}
          style={styles.container}
        >
          <Text style={styles.title}>Add Product Details</Text>
          <View style={styles.card}>
            <Controller
              name={`name`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  label={"Name"}
                  onChangeText={onChange}
                  returnKeyType={"next"}
                  value={value?.toString()}
                />
              )}
            />
            {errors.name && (
              <Text style={styles.errorText}>{`${errors.name?.message}`}</Text>
            )}
            <Controller
              name={`description`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  style={styles.textArea}
                  multiline
                  textAlignVertical="top"
                  label={"Description"}
                  onChangeText={onChange}
                  returnKeyType={"next"}
                  value={value?.toString()}
                />
              )}
            />
            {errors.description && (
              <Text
                style={styles.errorText}
              >{`${errors.description?.message}`}</Text>
            )}
            <Controller
              name={`price`}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  keyboardType={"number-pad"}
                  label={"Price"}
                  onChangeText={onChange}
                  returnKeyType={"done"}
                  value={value?.toString()}
                />
              )}
            />
            {errors.price && (
              <Text style={styles.errorText}>{`${errors.price?.message}`}</Text>
            )}
          </View>
          <View style={styles.ingredientsTitle}>
            <Text style={styles.title}>Add Ingredients</Text>
            <TouchableOpacity
              onPress={addIngredient}
              style={styles.buttonIngredient}
            >
              <Text style={styles.addIngredient}>+ Add</Text>
            </TouchableOpacity>
          </View>
          {fields?.map(ingredientCard)}
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={styles.button}
          >
            <Text style={styles.add}>Add</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return <ScreenView noSafeArea title={"Add Product"} content={getContent()} />;
};

export default AddProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.seaShell,
  },
  title: {
    fontSize: 12,
    fontWeight: "400",
    letterSpacing: 2,
    textTransform: "uppercase",
    color: Colors.dimGray,
  },
  card: {
    marginVertical: 14,
    borderRadius: 4,
    backgroundColor: Colors.white,
    padding: 16,
  },
  footer: {
    width: "100%",
    height: 110,
    backgroundColor: Colors.white,
    left: 0,
    right: 0,
    paddingHorizontal: 16,
    paddingTop: 16,
    shadowColor: "rgba(0, 0, 0, 0.10)",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 4,
  },
  add: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.white,
    padding: 12,
  },
  button: {
    backgroundColor: Colors.greenSheen,
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 8,
  },
  errorText: {
    fontSize: 11,
    fontWeight: "400",
    textAlign: "left",
    color: Colors.auburn,
    paddingVertical: 5,
  },
  textArea: {
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
    borderColor: Colors.quickSilver,
    marginVertical: 8,
    height: 100,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  addIngredient: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: "600",
    paddingHorizontal: 10,
  },
  buttonIngredient: {
    backgroundColor: Colors.greenSheen,
    padding: 8,
    borderRadius: 6,
  },
  ingredientsTitle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
