import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";
import socket from "../services/socket";
import TodoForm from "../components/TodoForm";

const TodoDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // For redirecting after delete
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
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
    socket.on("todoReminder", (data) => {
      if (data._id === id) {
        alert(`Reminder: "${data.title}" is due soon!`);
      }
    });

    return () => socket.off("todoReminder");
  }, [id]);

  const editTodo = async (updatedTodo) => {
    try {
      const response = await api.put(`/todos/${id}`, updatedTodo);
      setTodo(response.data); // Update the todo data after editing
      setShowModal(false); // Close the modal
      toast.success("Todo updated successfully!");
    } catch (error) {
      console.error("Error updating TODO:", error);
      toast.error("Failed to update the Todo. Please try again.");
    }
  };

  const deleteTodo = async () => {
    try {
      await api.delete(`/todos/${id}`); // Make DELETE API call
      toast.success("Todo deleted successfully!"); // Show toast notification
      navigate("/"); // Redirect to the home or another page
    } catch (error) {
      console.error("Error deleting TODO:", error);
      toast.error("Failed to delete the Todo. Please try again.");
    }
  };

  function backToHome() {
    console.log("back");
    navigate("/");
  }

  if (loading) return <p>Loading...</p>;
  if (!todo) return <p>TODO not found</p>;

  return (
    <div className="container mt-5">
      <h1>{todo.data.title}</h1>
      <p>
        <strong>Description:</strong> {todo.data.description}
      </p>
      <p>
        <strong>Due Date:</strong>
        {new Date(todo.data.dueDate).toLocaleString()}
      </p>
      <p>
        <strong>Status:</strong> {todo.data.status}
      </p>
      <button className="btn btn-info me-4" onClick={() => setShowModal(true)}>
        Edit
      </button>
      <button className="btn btn-warning me-4" onClick={deleteTodo}>
        Delete
      </button>
      <button onClick={backToHome} className="btn btn-info">
        Back
      </button>
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          aria-labelledby="editTodoModal"
          style={{ display: "block" }}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="editTodoModal">
                  Edit Todo
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)}
                />
              </div>
              <div className="modal-body">
                <TodoForm onSubmit={editTodo} initialData={todo.data} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoDetailPage;
