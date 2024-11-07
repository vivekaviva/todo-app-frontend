import React from "react";
import { Link } from "react-router-dom";

const TodoList = ({ todos = { pending: [], completed: [] } }) => {
  console.log("todos", todos); // Log to ensure it's correctly structured

  const { pending, completed } = todos; // Destructure pending and completed todos

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Pending Todos Column */}
        <div className="col-md-6">
          <h3>Pending Todos</h3>
          {pending.length > 0 ? (
            <div className="list-group">
              {pending.map((todo) => (
                <div key={todo._id} className="list-group-item">
                  <Link
                    to={`/todo/${todo._id}`}
                    className="text-decoration-none"
                  >
                    {todo.title}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No pending todos available</p>
          )}
        </div>

        {/* Completed Todos Column */}
        <div className="col-md-6">
          <h3>Completed Todos</h3>
          {completed.length > 0 ? (
            <div className="list-group">
              {completed.map((todo) => (
                <div key={todo._id} className="list-group-item">
                  <Link
                    to={`/todo/${todo._id}`}
                    className="text-decoration-none"
                  >
                    {todo.title}
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p>No completed todos available</p>
          )}
        </div>
      </div>
    </div>
  );
};
export default TodoList;
