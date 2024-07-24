import React, { useState, useEffect } from "react";
import { Task } from "../types"; // Импорт интерфейса Task

interface TaskFormProps {
  onSubmit: (task: Task) => Promise<void>;
  task?: Task;
}

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, task }) => {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [date, setDate] = useState(task?.date || "");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDate(task.date);
    }
  }, [task]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newTask = { id: task?.id, title, description, date };
    console.log("Отправка задачи:", newTask);
    await onSubmit(newTask);
    setTitle("");
    setDescription("");
    setDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="task-form p-6 border rounded-lg shadow-md bg-white w-full max-w-4xl mx-auto"
    >
      <div className="mb-4 flex flex-col">
        <label className="mb-2 text-gray-700 font-medium  ">Название</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label className="mb-2 text-gray-700 font-medium">Описание</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500"
          required
        ></textarea>
      </div>
      <div className="mb-4 flex flex-col">
        <label className="mb-2 text-gray-700 font-medium">Дата</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full transition duration-150 ease-out hover:ease-in rounded-md bg-indigo-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Добавить
      </button>
    </form>
  );
};

export default TaskForm;
