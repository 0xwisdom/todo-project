import { useState, useEffect } from 'react';
import './App.css';

function App() {
  // Variable that stores todo tasks.
  // if there are no previos task in localStorage tasks shoul be an empty array
  const [tasks, setTasks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('todo'));
    } catch {
      return [];
    }
  });
  console.log(tasks);

  // A boolean value. If true, html to add new task and display overlay is rendered.
  const [newTask, setNewTask] = useState(false);

  // The value of the new task input
  const [title, setTitle] = useState('');

  // Used to reverse task array so that newer tasks are shown first.
  const reverseTasks = [...tasks].reverse();

  // to add new task.
  function newTaskFtn() {
    if (newTask) {
      setTitle('');
      setNewTask(false);
    } else {
      setNewTask(true);
    }
  }

  function deleteTask(taskToDelete) {
    const newData = tasks.filter((item) => item !== taskToDelete);
    setTasks(newData);
    const localTasks = JSON.stringify(newData);
    localStorage.setItem('todo', localTasks);
  }

  function handleNewTask() {
    setNewTask(false);
    if (!title) {
      return;
    } else {
      setTasks((prev) => [...prev, { title: title, checked: false }]);
      setTitle('');
    }
  }

  // to close the input form for new task
  function closeNewTask() {
    setTitle('');
    setNewTask(false);
  }

  function checkTask(index) {
    const checkValue = tasks[index].checked
      ? (tasks[index].checked = false)
      : (tasks[index].checked = true);

    const updatedTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, checked: checkValue };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  useEffect(() => {
    const localTasks = JSON.stringify(tasks);
    localStorage.setItem('todo', localTasks);
  }, [tasks]);

  return (
    <>
      {newTask ? <div className="overlay" onClick={closeNewTask}></div> : ''}
      <div className="todo-container">
        <div className="task-container">
          <h1>Tasks List</h1>
          {newTask ? (
            <div className="task z-20 ">
              <label htmlFor="title" className="flex input-container">
                <div className="w-full">
                  <input type="checkbox" disabled />
                  <input
                    className="title-text"
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    autoFocus
                  />
                </div>
                <button onClick={handleNewTask} className="doneBtn">
                  Done
                </button>
              </label>
            </div>
          ) : (
            <p>Click the add (+) button to add a new task</p>
          )}

          {tasks
            ? reverseTasks.map((task, i) => (
                <div key={i} className="task">
                  <div className="flex">
                    <input
                      type="checkbox"
                      value={task.checked}
                      checked={task.checked}
                      onChange={() => checkTask(tasks.length - 1 - i)}
                    />
                    <h1
                      className={
                        task.checked ? 'title-text task-done' : 'title-text'
                      }
                    >
                      {task.title}
                    </h1>
                  </div>

                  <div className="red" onClick={() => deleteTask(task)}>
                    Delete
                  </div>
                </div>
              ))
            : ''}
        </div>
        <button
          onClick={newTaskFtn}
          className={newTask ? 'rotate addBtn' : 'addBtn'}
        >
          +
        </button>
      </div>
    </>
  );
}

export default App;
