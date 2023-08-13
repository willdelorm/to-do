export default function FilterButton({ name, isPressed, setFilter }) {
  return (
    <button
      className="filter-btn"
      aria-pressed={isPressed}
      onClick={() => setFilter(name)}
    >
      <span className="visually-hidden">{"Show"}</span>
      <span>{name}</span>
      <span className="visually-hidden">{"tasks"}</span>
    </button>
  );
}
