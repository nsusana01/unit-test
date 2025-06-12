import React, { useState } from 'react';
import TodoItem from './TodoItem';

const initialTasks = [
  { id: 1, text: 'Estudiar React', status: 'por hacer' },
  { id: 2, text: 'Practicar testing', status: 'haciendo' },
];

function TodoApp() {
  const [tasks, setTasks] = useState(initialTasks);
  const [text, setText] = useState('');
  const [search, setSearch] = useState('');

  const addTask = () => {
    if (text.trim() === '') return;
    const newTask = { id: Date.now(), text, status: 'por hacer' };
    setTasks([...tasks, newTask]);
    setText('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const updateStatus = (id, newStatus) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const updateText = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  const filteredTasks = tasks.filter(task =>
    task.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Gestor de Tareas
      </h1>

      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <input
          className="border p-2 rounded w-full md:w-1/3"
          placeholder="Buscar tarea..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <input
          className="border p-2 rounded w-full md:w-1/2"
          placeholder="Nueva tarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={addTask}
        >
          Agregar
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['por hacer', 'haciendo', 'hechas'].map((status) => (
          <div key={status}>
            <h2 className="text-xl font-semibold mb-2 capitalize text-gray-700">
              {status}
            </h2>
            <div className="space-y-2">
              {filteredTasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <TodoItem
                    key={task.id}
                    task={task}
                    updateStatus={updateStatus}
                    deleteTask={deleteTask}
                    updateText={updateText}
                  />
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoApp;
