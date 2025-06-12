import React, { useState } from 'react';
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import SearchBar from './components/SearchBar'

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

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-1/3">
            <SearchBar 
              search={search} 
              setSearch={setSearch} 
            />
          </div>
          <div className="w-full md:w-2/3">
            <TaskForm 
              text={text} 
              setText={setText} 
              addTask={addTask} 
            />
          </div>
        </div>

        <TaskList 
          filteredTasks={filteredTasks}
          updateStatus={updateStatus}
          deleteTask={deleteTask}
          updateText={updateText}
        />
      </div>
  );
}

export default TodoApp;