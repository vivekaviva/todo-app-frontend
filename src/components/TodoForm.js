import React, { useState, useEffect } from "react";
import api from "../services/api";

const TodoForm = ({ onSubmit, initialData = {} }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (Object.keys(initialData).length) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setDueDate(
        initialData.dueDate
          ? new Date(initialData.dueDate).toISOString().slice(0, 16)
          : ""
      );
      setStatus(initialData.status || "pending");
      setUserEmail(initialData.userEmail || "");
    }
  }, []); // Run only once when the component mounts

  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = { title, description, dueDate, status, userEmail };

    try {
      setLoading(true);
      setError("");

      let savedTodo;
      if (initialData._id) {
        // Edit existing todo
        const response = await api.put(`/todos/${initialData._id}`, todo);
        savedTodo = response.data;
      } else {
        // Create new todo
        const response = await api.post("/todos", todo);
        savedTodo = response.data;
      }

      // Notify parent component with the updated todo
      onSubmit(savedTodo);
    } catch (error) {
      console.error("Error saving TODO:", error);
      setError("Failed to save TODO. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3>{initialData._id ? "Edit Todo" : "Create New Todo"}</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <textarea
            id="description"
            className="form-control"
            rows="4"
            placeholder="Enter the description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
          <input
            type="datetime-local"
            id="dueDate"
            className="form-control"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Status
          </label>
          <select
            id="status"
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="userEmail" className="form-label">
            User Email
          </label>
          <input
            type="email"
            id="userEmail"
            className="form-control"
            placeholder="Enter the email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
