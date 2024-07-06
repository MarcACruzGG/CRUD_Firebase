import * as React from "react";
import * as RN from "react-native";

export default function Task({ emoji, name, completed }) {
  return (
    <RN.View style={styles.task}>
      <RN.Text style={styles.emoji}>{emoji}</RN.Text>
      <RN.Text style={styles.name}>{name}</RN.Text>
      <RN.Text style={styles.status}>{completed ? "Realizada" : "Pendiente"}</RN.Text>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  task: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  emoji: {
    fontSize: 24,
    marginRight: 16,
  },
  name: {
    fontSize: 18,
    flex: 1,
  },
  status: {
    fontSize: 18,
    color: completed ? "green" : "red",
  },
});
