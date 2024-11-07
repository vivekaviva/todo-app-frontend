import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import socket from "../services/socket";

const TodoDetailPage = () => {
  const { id } = useParams(); // Retrieve the TODO ID from the URL
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);

  // if (process.env.NODE_ENV === "development") {
  //   window.socket = socket;
  // }

  useEffect(() => {
    // Fetch the TODO item by ID when the component mounts
    const fetchTodo = async () => {
      try {
        const response = await api.get(`/todos/${id}`);
        setTodo(response.data);
      } catch (error) {
        console.error("Error fetching TODO details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  useEffect(() => {
    // Listen for reminders specific to this TODO item
    socket.on("todoReminder", (data) => {
      if (data._id === id) {
        alert(`Reminder: "${data.title}" is due soon!`);
      }
    });

    // Cleanup the socket event listener on unmount
    return () => socket.off("todoReminder");
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!todo) return <p>TODO not found</p>;
  console.log(todo.data);
  return (
    <div className="container mt-5">
      <h1>{todo.data.title}</h1>
      <p>
        <strong>Description:</strong> {todo.data.description}
      </p>
      <p>
        <strong>Due Date:</strong>{" "}
        {new Date(todo.data.dueDate).toLocaleString()}
      </p>
      <p>
        <strong>Status:</strong> {todo.data.status}
      </p>
      <button className="btn btn-info me-4">Edit</button>
      <button className="btn btn-warning">Delete</button>
    </div>
  );
};

export default TodoDetailPage;
