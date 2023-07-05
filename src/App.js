import { useState } from "react";

const styled = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
};

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [time, setTime] = useState("");
  const [editIndex, setEditIndex] = useState(-1);

  const handleNewTask = (e) => {
    setNewTask(e.target.value);
  };

  const handleTime = (e) => {
    setTime(e.target.value);
  };

  const handleAllTasks = () => {
    if (newTask && time) {
      setTasks([...tasks, { newTask, time }]);
      setNewTask("");
      setTime("");
    }
  };

  const handleDeleteTask = (ind) => {
    const filteredTasks = [...tasks];
    filteredTasks.splice(ind, 1);
    setTasks(filteredTasks);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleUpdate = (ind, updatedTask, Updatedtime) => {
    const updatedTasks = [...tasks];
    updatedTasks[ind] = { newTask: updatedTask, time: Updatedtime };
    setTasks(updatedTasks);
  };

  const renderedTasks = tasks.map((el, ind) => {
    const doEdit = editIndex === ind;
    return (
      <div
        key={ind}
        style={{
          width: "70%",
          margin: "5px",
          border: "1px solid black",
          ...styled
        }}
      >
        <p>{ind + 1}.</p>
        {doEdit ? (
          <>
            <input
              value={el.newTask}
              onChange={(e) => handleUpdate(ind, e.target.value, el.time)}
            />
            <input
              value={el.time}
              onChange={(e) => handleUpdate(ind, el.newTask, e.target.value)}
            />
            <button onClick={() => setEditIndex(-1)}>Save</button>
          </>
        ) : (
          <>
            <p>{el.newTask}</p>
            <p>{el.time}</p>
          </>
        )}
        <span>
          {!doEdit && <button onClick={() => setEditIndex(ind)}>Edit</button>}
          <button onClick={() => handleDeleteTask(ind)}>Delete</button>
        </span>
      </div>
    );
  });
  return (
    <div>
      <div>
        <form style={{ width: "50%", ...styled }} onSubmit={handleSubmit}>
          <input
            value={newTask}
            onChange={handleNewTask}
            placeholder="add new task"
          />
          <input value={time} onChange={handleTime} placeholder="add time" />
          <button onClick={handleAllTasks}>Add task</button>
        </form>
      </div>
      {renderedTasks}
    </div>
  );
}
