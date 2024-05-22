import { Text, StyleSheet, View, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";
import { Colors } from "../../constants/styles";
import { useTranslation } from "react-i18next";
function ProductItem({ product, onPress,id }) {
    const navigation = useNavigation();
    const authCtx = useContext(AuthContext);
    const {t} = useTranslation();
    const handlePress = () => {
        navigation.navigate('ProductDetails', {
            product: product
        });
    };
  return (
    <View
   
    style={[
        styles.container,
        {
            backgroundColor:  "transparent",
            borderBottomColor: 'transparent',
        }
    ]}
>
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.img }} style={styles.image} />
      </View>
      <View style={[styles.infoContainer]}>
        <Text style={[styles.name,{color: authCtx.darkMode? Colors.white: '#000'}]}>{product.name}</Text>
        <Text style={styles.price}>{t('Price')}: ${product.price}</Text>
        <Text style={styles.quantity}>{t("Quantity")}: {product.quantity}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#555",
    padding: 10,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#fff", // Default background color
  },
  imageContainer: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 20,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  price: {
    fontSize: 16,
    marginBottom: 5,
    color: "#ffffff",
  },
  quantity: {
    fontSize: 16,
    color: "#ffffff",
  },
});

export default ProductItem;
