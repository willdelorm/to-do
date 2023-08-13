import { useEffect, useRef, useState } from "react";

export default function Todo({
  id,
  name,
  completed,
  editTask,
  toggleCompleted,
  deleteTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState("");

  const editFieldRef = useRef(null);
  const editTaskRef = useRef(null);

  const handleChange = (e) => {
    setNewName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editTask(id, newName);
    setNewName("");
    setIsEditing(false);
  };

  const editingTask = (
    <div className="form-overlay">
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>Edit Task</h2>
          <button
            type="button"
            className="btn__danger"
            onClick={() => deleteTask(id)}
          >
            Delete <span className="visually-hidden">task {name}</span>
          </button>
        </div>
        <div className="form-group stack-exception">
          <label className="task-name">Task Name</label>
          <input
            type="text"
            id={id}
            className="input input__lg"
            value={newName}
            onChange={handleChange}
            ref={editFieldRef}
          />
        </div>
        <div className="btn-group">
          <button
            type="button"
            className="btn btn__outline_primary btn__lg"
            onClick={() => setIsEditing(false)}
          >
            {"Cancel"}
            <span className="visually-hidden">renaming task</span>
          </button>
          <button type="submit" className="btn btn__primary btn__lg">
            {"Save"}
            <span className="visually-hidden">updated task</span>
          </button>
        </div>
      </form>
    </div>
  );

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }
  const wasEditing = usePrevious(isEditing);

  useEffect(() => {
    if (!wasEditing && isEditing) {
      editFieldRef.current.focus();
    }
    if (wasEditing && !isEditing) {
      editTaskRef.current.focus();
    }
  }, [wasEditing, isEditing]);

  return (
    <li>
      <div className="todo">
        <div className="cb">
          <input
            id={id}
            type="checkbox"
            defaultChecked={completed}
            onChange={() => toggleCompleted(id)}
          />
          <label className="cm" htmlFor={id} />
        </div>
        <p className="todo-label" onClick={() => setIsEditing(true)} ref={editTaskRef}>
          {name}
        </p>
      </div>
      {isEditing ? editingTask : null}
    </li>
  );
}
