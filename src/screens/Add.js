import * as React from "react";
import * as RN from "react-native";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../../config/fb";
import { useNavigation } from "@react-navigation/native";
import EmojiPicker from "rn-emoji-keyboard";

export default function Add() {
  const navigation = useNavigation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [newTask, setNewTask] = React.useState({
    emoji: "📋",
    name: "",
    completed: false,
    createdAt: new Date(),
  });

  const handlePick = (emojiObject) => {
    setNewTask({
      ...newTask,
      emoji: emojiObject.emoji,
    });
  };

  const onSend = async () => {
    const docRef = await addDoc(collection(database, "tasks"), newTask);
    navigation.goBack();
  };

  return (
    <RN.View style={styles.container}>
      <RN.Text style={styles.title}>Crear Nueva Tarea</RN.Text>
      <RN.Text onPress={() => setIsOpen(true)} style={styles.emoji}>
        {newTask.emoji}
      </RN.Text>
      <EmojiPicker
        onEmojiSelected={handlePick}
        open={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <RN.TextInput
        onChangeText={(text) => setNewTask({ ...newTask, name: text })}
        style={styles.inputContainer}
        placeholder="Tarea"
        placeholderTextColor="#757575"
      />
      <RN.Button title="Agregar" onPress={onSend} color="#2E7D32" />
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
