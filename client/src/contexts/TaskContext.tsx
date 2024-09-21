import React, { createContext, useState, useContext, useEffect } from 'react';
import { getTasks, createTask, updateTask, deleteTask } from '../services/api';

interface Task {
  _id: string;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Completed';
  priority: 'Low' | 'Medium' | 'High';
  dueDate?: Date;
}

interface TaskContextType {
  tasks: Task[];
  addTask: (task: Omit<Task, '_id'>) => Promise<void>;
  updateTask: (id: string, task: Partial<Task>) => Promise<void>;
  removeTask: (id: string) => Promise<void>;
  fetchTasks: () => Promise<void>;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasks = async () => {
    const fetchedTasks = await getTasks();
    // console.log('Fetched tasks:', fetchedTasks);
    setTasks(fetchedTasks);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task: Omit<Task, '_id'>) => {
    const newTask = await createTask(task);
    setTasks([...tasks, newTask]);
  };

  const updateTaskItem = async (id: string, updatedTask: Partial<Task>) => {
    const updated = await updateTask(id, updatedTask);
    setTasks(tasks.map(task => task._id === id ? { ...task, ...updated } : task));
  };

  const removeTask = async (id: string) => {
    await deleteTask(id);
    setTasks(tasks.filter(task => task._id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask: updateTaskItem, removeTask, fetchTasks }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  // console.log('Task Context:', context);
  
  return context;
};