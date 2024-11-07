import { useState, useEffect } from "react";
import api from "../services/api";

const useFetchTodos = (page) => {
  const [todos, setTodos] = useState({ pending: [], completed: [] });
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/todos?page=${page}`);
      // Set both pending and completed todos
      setTodos({
        pending: response.data?.data?.pending || [],
        completed: response.data?.data?.completed || [],
      });
    } catch (error) {
      console.error("Error fetching todos:", error);
      setTodos({ pending: [], completed: [] });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [page]);

  return { todos, loading, fetchTodos };
};

export default useFetchTodos;
