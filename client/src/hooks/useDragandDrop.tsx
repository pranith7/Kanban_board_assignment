import { useState } from 'react';

export const useDragAndDrop = () => {
  const [draggedTask, setDraggedTask] = useState(null);

  const onDragStart = (e, taskId) => {
    e.dataTransfer.setData('text/plain', taskId);
    setDraggedTask(taskId);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const onDrop = (e) => {
    e.preventDefault();
    setDraggedTask(null);
  };

  return { draggedTask, onDragStart, onDragOver, onDrop };
};