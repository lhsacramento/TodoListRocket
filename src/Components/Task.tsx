import TaskStyle from './Task.module.css';
import {useState, ChangeEvent} from 'react';
import {Trash} from 'phosphor-react';

interface Task{
    content: string;
    completed?: boolean;
    OnDeleteTask: (content: string) => void;
    OnChangeCompleted: (completed: boolean, content: string) => void;
}

export function Task({content, completed, OnDeleteTask, OnChangeCompleted}: Task){
    const [taskCompleted, setTaskCompleted] = useState(completed);

    function handleOnDeleteTask(){
        OnDeleteTask(content);
    }

    function handleOnChangeTaskCompleted(){
        const _tc = !taskCompleted;
        setTaskCompleted(_tc);
        OnChangeCompleted(_tc, content);
    }

    return(
        <div className={TaskStyle.task}>
            <input 
                type='checkbox'  
                checked={taskCompleted} 
                onChange={handleOnChangeTaskCompleted} 
                className={TaskStyle.taskCheckBox}>
            </input>    
            <div className={TaskStyle.taskContent}>{content}</div>
            <button onClick={handleOnDeleteTask} className={TaskStyle.taskDeleteButton}><Trash/></button>
        </div>
    );
}