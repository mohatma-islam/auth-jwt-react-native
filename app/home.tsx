import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import axios from "axios";
import { API_URL } from "@/context/AuthContext";

interface Todo {
  _id: string;
  task: string;
  desc?: string; // Optional description field
  status: number;
  private: boolean;
  creator: {
    _id: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
  createdAt: string;
  updatedAt: string;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(`${API_URL}/todos`);
        setTodos(response.data as Todo[]); // Type assertion for safety
      } catch (error) {
        console.error("Error fetching todos:", error);
        // Handle errors gracefully (e.g., display an error message)
      }
    };

    fetchTodos();
  }, []);

  const renderTodo = ({ item }: { item: Todo }) => (
    <View style={styles.setRow}>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          <Text style={styles.rowTitle}>{item.task}</Text>
          <Text>{item.desc}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View>
      <Text style={{ margin: 20, textAlign: 'center', fontSize: 20, fontWeight: '600' }}>Todos</Text>
      {todos.length > 0 ? (
        <FlatList
          data={todos}
          renderItem={renderTodo}
          keyExtractor={(item) => item._id}
        />
      ) : (
        <Text>No todos found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  setRow: {
    padding: 16,
    margin: 5,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  rowTitle: {
    fontSize: 16,
    fontWeight: "500", //thickness of the font
  },
});

export default Home;
