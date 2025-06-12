import React, { useState } from 'react';

function TodoItem({ task, updateStatus, deleteTask, updateText }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(task.text);

    const nextStatus = {
        'por hacer': 'haciendo',
        'haciendo': 'hechas',
        'hechas': 'por hacer',
    };

    const handleEditSave = () => {
        updateText(task.id, editText);
        setIsEditing(false);
    };

    return (
        <div className="bg-white shadow-md rounded p-3 flex items-center justify-between">
            {isEditing ? (
                <input
                    className="border p-1 rounded w-full mr-2"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                />
            ) : (
                <span className="flex-1 text-gray-800">{task.text}</span>
            )}

            <div className="flex gap-1 ml-2">
                <button
                    className="bg-green-500 text-white text-sm px-2 py-1 rounded hover:bg-green-600"
                    onClick={() => updateStatus(task.id, nextStatus[task.status])}
                >
                    {nextStatus[task.status]}
                </button>

                {isEditing ? (
                    <button
                        className="bg-blue-500 text-white text-sm px-2 py-1 rounded hover:bg-blue-600"
                        onClick={handleEditSave}
                    >
                        Guardar
                    </button>
                ) : (
                    <button
                        className="bg-yellow-400 text-white text-sm px-2 py-1 rounded hover:bg-yellow-500"
                        onClick={() => setIsEditing(true)}
                    >
                        Editar
                    </button>
                )}

                <button
                    className="bg-red-600 text-white text-sm px-2 py-1 rounded hover:bg-red-700"
                    onClick={() => deleteTask(task.id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
}

export default TodoItem;