import React, { useState, useEffect } from "react";
import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import useFetchTodos from "../hooks/fetchTodo";
import socket from "../services/socket";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const { todos, loading } = useFetchTodos(page);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    socket.on("todoReminder", (data) => {
      alert(`Reminder: ${data.title} is due soon!`);
    });

    return () => socket.off("todoReminder");
  }, []);

  const addTodo = async (todo) => {
    // Add the new TODO to the server here
    console.log(todo);
    setShowModal(false); // Close modal after submitting the form
  };

  return (
    <div className="container">
      <h1>TODO List</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowModal(true)} // Open modal on button click
      >
        New Todo
      </button>

      {/* Modal for New Todo */}
      {showModal && (
        <div
          className="modal fade show"
          tabIndex="-1"
          aria-labelledby="newTodoModal"
          style={{ display: "block" }}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="newTodoModal">
                  New Todo
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setShowModal(false)} // Close modal when X is clicked
                />
              </div>
              <div className="modal-body">
                <TodoForm onSubmit={addTodo} />
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? <p>Loading...</p> : <TodoList todos={todos} />}
    </div>
  );
};

export default HomePage;
