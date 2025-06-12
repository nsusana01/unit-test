import React from 'react';
import TodoItem from './TodoItem';

function TaskList({ filteredTasks, updateStatus, deleteTask, updateText }) {
  return (
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
  );
}

export default TaskList;

