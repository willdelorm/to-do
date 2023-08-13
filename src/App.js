import { useEffect, useRef, useState } from "react";
import { nanoid } from "nanoid";
import FilterButton from "./components/FilterButton";
import Form from "./components/Form";
import Todo from "./components/Todo";

const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

const DATA = [
  {
    id: "todo-0",
    name: "Welcome to your new to do list!",
    completed: true,
  },
  {
    id: "todo-1",
    name: "Press + to add a new task.",
    completed: false,
  },
  {
    id: "todo-2",
    name: "Press a task to edit or delete it.",
    completed: false,
  },
];

const FILTER_MAP = {
  All: () => true,
  Ongoing: (task) => !task.completed,
  Completed: (task) => task.completed,
};
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App() {
  const [tasks, setTasks] = useState(DATA);
  const [filter, setFilter] = useState("All");

  const listHeadingRef = useRef(null);

  const addTask = (name) => {
    const newTask = {
      id: { nanoid },
      name,
      completed: false,
    };

    setTasks([...tasks, newTask]);
  };

  const editTask = (id, newName) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, name: newName };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const toggleCompleted = (id) => {
    const updatedTasks = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    const remainingTasks = tasks.filter((task) => id !== task.id);

    setTasks(remainingTasks);
  };

  const taskList = tasks
    .filter(FILTER_MAP[filter])
    .map((task) => (
      <Todo
        key={task.id}
        id={task.id}
        name={task.name}
        completed={task.completed}
        editTask={editTask}
        toggleCompleted={toggleCompleted}
        deleteTask={deleteTask}
      />
    ));

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton
      key={name}
      name={name}
      isPressed={name === filter}
      setFilter={setFilter}
    />
  ));

  const today = new Date();
  const getDate = today.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  const prevTaskLength = usePrevious(tasks.length);

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus();
    }
  }, [tasks.length, prevTaskLength]);

  return (
    <div className="app">
      <header className="header">
        <h1 className="visually-hidden">{"To Do List"}</h1>
        <h2 className="list-heading" tabIndex="-1" ref={listHeadingRef}>
          Your Tasks
        </h2>
        <p className="date">{getDate}</p>
      </header>
      <div id="filters" className="filters">
        {filterList}
      </div>
      <ul id="todo-list" className="todo-list stack-large stack-exception">
        {taskList}
      </ul>
      <Form addTask={addTask} />
    </div>
  );
}
