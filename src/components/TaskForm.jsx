import React from 'react';

function TaskForm({ text, setText, addTask }) {
  return (
    <div className="flex gap-3 items-center w-full">
      <input
        className="border p-2 rounded w-full"
        placeholder="Nueva tarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 whitespace-nowrap"
        onClick={addTask}
      >
        Agregar
      </button>
    </div>
  );
}

export default TaskForm;

