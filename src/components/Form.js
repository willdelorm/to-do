import { useState } from "react";

export default function Form({ addTask }) {
  const [name, setName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name !== "") {
      addTask(name);
      setName("");
      setIsEditing(false);
    }
  };

  const newTaskButton = (
    <div className="new-task-button" onClick={() => setIsEditing(true)}>
      <button type="button" className="btn btn__primary btn__circle">
        +
      </button>
    </div>
  );

  const createNewTask = (
    <div className="form-overlay">
      <form onSubmit={handleSubmit}>
        <h2>Create New Task</h2>
        <div className="form-group stack-exception">
          <label className="task-name">Task Name</label>
          <input
            type="text"
            id="todo-input"
            className="input input__lg"
            name="text"
            autoComplete="off"
            value={name}
            onChange={handleChange}
          />
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn__outline_primary btn__lg"
            onClick={() => setIsEditing(false)}
          >
            {"Cancel"}
          </button>
          <button type="submit" className="btn btn__primary btn__lg">
            {"Create Task"}
          </button>
        </div>
      </form>
    </div>
  );

  return <div>{isEditing ? createNewTask : newTaskButton}</div>;
}
