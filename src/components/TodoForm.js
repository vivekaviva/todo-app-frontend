import React, { useState } from "react";
import api from "../services/api";

const TodoForm = ({ onSubmit }) => {
  // State for each form field
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(false); // To track loading state
  const [error, setError] = useState(""); // To track errors

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new TODO object with all the necessary fields
    const newTodo = { title, description, dueDate, status, userEmail };

    try {
      setLoading(true);
      setError(""); // Clear any previous errors

      // Make the POST request to the API
      // const response = await fetch("http://localhost:8000/todos", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(newTodo),
      // });

      const response = await api.post("/todos", newTodo);

      // if (!response.ok) {
      //   // Handle error response from API
      //   throw new Error("Failed to create TODO");
      // }

      const result = await response.json();
      console.log("Todo created:", result);

      // Optionally reset the form or call onSubmit if you need to update the UI
      setTitle("");
      setDescription("");
      setDueDate("");
      setStatus("pending");
      setUserEmail("");

      // Call the parent onSubmit if needed (optional)
      onSubmit(result);
    } catch (error) {
      console.error("Error creating TODO:", error);
      setError("Failed to create TODO. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container mt-4">
      <h3>Create New Todo</h3>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
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

        {/* Description Textarea */}
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

        {/* Due Date Input */}
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

        {/* Status Dropdown */}
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

        {/* User Email Input */}
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

        {/* Error Message */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Adding..." : "Add Todo"}
        </button>
      </form>
    </div>
  );
};

export default TodoForm;
