import { useState, useEffect } from "react";
// import axios from "axios";
import api from "../services/api";

const useFetchTodos = (page) => {
  const [todos, setTodos] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        console.log("Requesting:", api.defaults.baseURL + "/todos");
        const response = await api.get("/todos");
        // const response = await axios.get(`/todos`);
        console.log("api", response);
        setTodos(response.data.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [page]);

  return { todos, loading };
};

export default useFetchTodos;
