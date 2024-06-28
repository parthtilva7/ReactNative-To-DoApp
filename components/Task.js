import React from "react";
import { StyleSheet, View, Text, Switch } from "react-native";
import { Card, IconButton } from "react-native-paper";

const Task = ({ task, onDelete, onToggleStatus }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.taskContainer}>
        <View style={styles.taskInfo}>
          <Text style={[styles.taskTitle, task.status && styles.taskDone]}>
            {task.title}
          </Text>
          {task.status && <Text style={styles.doneText}>DONE</Text>}
        </View>
        <Switch
          value={task.status}
          onValueChange={() => onToggleStatus(task.id)}
          color="#2ecc71"
        />
        <IconButton
          icon="delete"
          color="red"
          size={20}
          onPress={() => onDelete(task.id)}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    elevation: 3,
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
  },
  taskInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  taskTitle: {
    fontSize: 18,
  },
  taskDone: {
    textDecorationLine: "line-through",
    color: "grey",
  },
  doneText: {
    color: "#2ecc71",
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default Task;
