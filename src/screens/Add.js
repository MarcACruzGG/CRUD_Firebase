import * as React from "react";
import * as RN from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../../config/fb";
import { useNavigation } from "@react-navigation/native";
import EmojiPicker from "rn-emoji-keyboard";

export default function Add() {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [newItem, setNewItem] = React.useState({
    emoji: "📷",
    name: "",
    price: 0,
    isSold: false,
    createdAt: new Date(),
  });

  const handlePick = (emojiObject) => {
    setNewItem({
      ...newItem,
      emoji: emojiObject.emoji,
    });
  };

  const onSend = async () => {
    const docRef = await addDoc(collection(database, "products"), newItem);
    navigation.goBack();
  };

  return (
    <RN.View style={styles.container}>
      <RN.Text style={styles.title}>Vender un Nuevo Producto</RN.Text>
      <RN.Text onPress={() => setIsOpen(true)} style={styles.emoji}>
        {newItem.emoji}
      </RN.Text>
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <RN.TextInput
        onChangeText={(text) => setNewItem({ ...newItem, name: text })}
        style={styles.inputContainer}
        placeholder="Nombre del Producto"
        placeholderTextColor="#757575"
      />
      <RN.TextInput
        onChangeText={(text) => setNewItem({ ...newItem, price: text })}
        style={styles.inputContainer}
        placeholder="$ Precio"
        placeholderTextColor="#757575"
        keyboardType="numeric"
      />
      <RN.Button title="Publicar" onPress={onSend} color="#2E7D32" />
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1E88E5",
    margin: 20,
  },
  inputContainer: {
    width: "90%",
    padding: 13,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: "#90CAF9",
    borderRadius: 6,
  },
  emoji: {
    fontSize: 100,
    borderWidth: 1,
    borderColor: "#90CAF9",
    borderRadius: 6,
    padding: 10,
    marginVertical: 6,
  },
});
