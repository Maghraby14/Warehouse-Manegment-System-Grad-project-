import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../../store/auth-context";
import { Colors } from "../../constants/styles";
import { Swipeable } from "react-native-gesture-handler";
import { FontAwesome } from '@expo/vector-icons';

const FeedItem = ({ title, body, onPress, index,onMove }) => {
  const authCtx = useContext(AuthContext);

  const renderRightActions = () => (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.deleteButton, { backgroundColor: Colors.error }]}
    >
      <FontAwesome name="trash" size={35} color="red" />
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View
        key={index}
        style={[
          styles.feedContainer,
          { backgroundColor: authCtx.darkMode ? Colors.darksec2 : Colors.white },
        ]}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <Text style={[styles.feedTitle, { color: authCtx.darkMode ? Colors.white : "#000" }]}>{title}</Text>
        </View>
        <Text style={[styles.feedBody, { color: authCtx.darkMode ? Colors.white : "#000" }]}>{body}</Text>
        <TouchableOpacity
          onPress={onMove}
          style={[styles.clearButton, { backgroundColor: authCtx.darkMode ? Colors.darksec : Colors.primary100 }]}
        >
          <Text style={styles.clearButtonText}>{title === 'Product Expired' ? "Remove From Warehouse" : "Make An Order"}</Text>
        </TouchableOpacity>
      </View>
    </Swipeable>
  );
};

export default FeedItem;

const styles = StyleSheet.create({
  feedContainer: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: Colors.white,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: 340,
  },
  feedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 0,
    color: "#000",
  },
  feedBody: {
    fontSize: 14,
    color: "#000",
  },
  clearButton: {
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    alignItems: "center",
  },
  clearButtonText: {
    color: Colors.white,
  },
  deleteButton: {
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});
