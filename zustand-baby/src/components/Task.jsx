import React from 'react'
import classNames from 'classnames';
import "./Task.css";
import { useStore } from '../store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export default function Task({ title }) {
  const task = useStore((store) => 
    store.tasks.find((task) => task.title === title));

  const deleteTask = useStore(store => store.deleteTask);
  const setDraggedTask = useStore(store => store.setDraggedTask);
    
  return (
    <div 
      className='task' 
      draggable
      onDragStart={() => {setDraggedTask(task.title)}}
    >
        <div>{title}</div>
        <div className='bottom--wrapper'>
            <div className='delete' onClick={() => deleteTask(task.title)}>
              <FontAwesomeIcon icon={faTrash} />
              </div>
            <div className={classNames("status", task.state)}>{task.state}</div>
        </div>
    </div>
  )
}