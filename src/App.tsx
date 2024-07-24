import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import { Task } from "./types";
import "./App.module.scss";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        "https://6d78b0dd7b7eec70.mokky.dev/tasks"
      );
      console.log("Полученные задачи:", response.data);
      setTasks(response.data);
    } catch (error) {
      console.error("Ошибка при получении задач:", error);
    }
  };

  const addTask = async (task: Task) => {
    try {
      const response = await axios.post(
        "https://6d78b0dd7b7eec70.mokky.dev/tasks",
        task
      );
      console.log("Добавлена ​​задача:", response.data);
      setTasks([...tasks, response.data]);
    } catch (error) {
      console.error("Ошибка при добавлении задачи:", error);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      if (task.id === undefined || task.id === null) {
        throw new Error("Идентификатор задачи не определен или равен нулю.");
      }
      const response = await axios.patch(
        `https://6d78b0dd7b7eec70.mokky.dev/tasks/${task.id}`,
        task
      );
      console.log("Updated task:", response.data);
      setTasks(tasks.map((t) => (t.id === task.id ? response.data : t)));
    } catch (error) {
      console.error("Ошибка обновления задачи:", error);
      alert(
        "Не удалось обновить задачу. Пожалуйста, проверьте, существует ли задача, и повторите попытку."
      );
    }
    setEditingTask(null);
  };

  const deleteTask = async (id: number) => {
    try {
      await axios.delete(`https://6d78b0dd7b7eec70.mokky.dev/tasks/${id}`);
      console.log("ID удаленной задачи:", id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Ошибка удаления задачи:", error);
    }
  };

  return (
    <div className="app container mx-auto p-4 flex items-center justify-center flex-col max-w-screen-md">
      <h1 className="text-2xl font-medium mb-4 text-center">Todo App</h1>
      <TaskForm
        onSubmit={editingTask ? updateTask : addTask}
        task={editingTask || undefined}
      />
      <TaskList tasks={tasks} onEdit={setEditingTask} onDelete={deleteTask} />
    </div>
  );
};

export default App;
