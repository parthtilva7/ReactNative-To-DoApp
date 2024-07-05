import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  FlatList,
  Text,
} from "react-native";
import { Button, Card } from "react-native-paper";
import Task from "./components/Task";
import { db } from "./firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "tasks"), (snapshot) => {
      const tasksList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksList);
    });
    return unsubscribe;
  }, []);

  const addTask = async () => {
    if (taskTitle.trim()) {
      await addDoc(collection(db, "tasks"), {
        title: taskTitle,
        status: false,
      });
      setTaskTitle("");
    }
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const toggleTaskStatus = async (id) => {
    const task = tasks.find((task) => task.id === id);
    await updateDoc(doc(db, "tasks", id), {
      status: !task.status,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>
      <Card style={styles.inputCard}>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          value={taskTitle}
          onChangeText={setTaskTitle}
        />
        <Button
          mode="contained"
          onPress={addTask}
          disabled={!taskTitle.trim()}
          style={styles.addButton}
        >
          Add Task
        </Button>
      </Card>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Task
            task={item}
            onDelete={deleteTask}
            onToggleStatus={toggleTaskStatus}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.noTasksText}>No tasks added.</Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputCard: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#fff",
    elevation: 3,
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#3498db",
  },
  noTasksText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
  },
});
