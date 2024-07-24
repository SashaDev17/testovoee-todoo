import React from "react";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEdit, onDelete }) => {
  return (
    <div className="task-item p-4 border rounded-lg mt-4 mb-4 bg-whitemx-auto shadow-sm">
      <h2 className="font-bold text-lg mb-1">{task.title}</h2>
      <p className="text-gray-700 mb-1">{task.description}</p>
      <small className="text-gray-500">{task.date}</small>
      <div className="mt-4 flex gap-3">
        <button
          onClick={() => onEdit(task)}
          className="rounded-md bg-indigo-800 transition duration-150 ease-out hover:ease-in px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Редактировать
        </button>
        <button
          onClick={() => onDelete(task.id!)}
          className="rounded-md transition duration-150 ease-out hover:ease-in bg-red-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
