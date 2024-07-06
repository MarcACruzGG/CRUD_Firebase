import * as React from "react";
import * as RN from "react-native";
import { useNavigation } from "@react-navigation/native";
import { database } from "../../config/fb";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import Task from "../components/Task"; // Asegúrate de actualizar el componente Product a Task

export default function Home() {
  const [tasks, setTasks] = React.useState([]);
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <RN.Button title="Agregar" onPress={() => navigation.navigate("Add")} />
      ),
    });
  }, [navigation]);

  React.useEffect(() => {
    const collectionRef = collection(database, "tasks");
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsusbscribe");
      setTasks(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          emoji: doc.data().emoji,
          name: doc.data().name,
          completed: doc.data().completed,
          createdAt: doc.data().createdAt,
        }))
      );
    });
    return unsubscribe;
  }, []);

  return (
    <RN.View style={styles.container}>
      <RN.ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <RN.Text style={styles.title}>Tareas</RN.Text>
        {tasks.map((task) => (
          <Task key={task.id} {...task} />
        ))}
      </RN.ScrollView>
    </RN.View>
  );
}

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8F5E9",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    margin: 16,
    color: "#2E7D32",
  },
});
