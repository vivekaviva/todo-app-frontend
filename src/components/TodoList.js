import React from "react";
import { Link } from "react-router-dom";

const TodoList = ({ todos = [] }) => {
  console.log("todo", todos);

  // Extract pending and completed todos
  const pendingTodos = todos.pending || [];
  const completedTodos = todos.completed || [];

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Pending Todos Column */}
        <div className="col-md-6">
          <h3>Pending Todos</h3>
          {pendingTodos.length > 0 ? (
            <div className="list-group">
              {pendingTodos.map((todo) => (
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
          {completedTodos.length > 0 ? (
            <div className="list-group">
              {completedTodos.map((todo) => (
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
