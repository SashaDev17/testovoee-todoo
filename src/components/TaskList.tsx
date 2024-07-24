import React from "react";
import TaskItem from "./TaskItem";
import { Task } from "../types";

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className="task-list w-full max-w-4xl mx-auto p-4 space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskList;
