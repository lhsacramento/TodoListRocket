import BodyComponnentStyle from './BodyComponnentStyle.module.css';
import ClipboardImg from '../assets/Clipboard.png';
import AddTaskIcon from '../assets/addTaskIcon.png';
import {Task} from './Task';
import { useState, FormEvent, ChangeEvent } from 'react';

const _myTasks = [{
        content: 'Primeiro',
        completed: true,
    },
    {
        content: 'Segundo',
        completed: false,
    },
    {
        content: 'Terceiro',
        completed: false,
    },
    {
        content: 'Quarto',
        completed: true,

    },
];


export function BodyComponnent(){

    const [myTasks,setMyTasks] = useState([..._myTasks]);
    const [newTask, setNewTask] = useState('');

    
    function handleDeleteComment(taskToDelete: string){
        const newTasksWithoutDeleted = myTasks.filter((task) => task.content !== taskToDelete);
        setMyTasks(newTasksWithoutDeleted);
    }

    function handleCreateNewTask(event: FormEvent)
    {
        event.preventDefault();
        const t = [...myTasks,{content: newTask, completed:false}];
        setMyTasks(t);
        setNewTask('');     
    }

    function handleChangeNewTask(event: ChangeEvent<HTMLTextAreaElement>)
    {
        setNewTask(event.target.value);
    }

    function howManyTasksCompleted(){
        let count = 0;
        for(let _task of myTasks){
            if(_task.completed){
                count++;
            }
        }        
        return count;
    }

    function handleUpdateCompletedTasksCount(isCompleted:boolean, content: string){
        for(const _task of myTasks){
            if(_task.content === content){
                _task.completed = isCompleted;
            }
        }

        setMyTasks([...myTasks]);
    }

    return (
        <div className={BodyComponnentStyle.container}>
            <form onSubmit={handleCreateNewTask} className={BodyComponnentStyle.newTodoComponnent}>
                <textarea value={newTask} onChange={handleChangeNewTask} maxLength={65} placeholder='Adicione uma nova tarefa'></textarea>
                <button type='submit'>Criar <img src={AddTaskIcon}/></button>
            </form>

            <section className={BodyComponnentStyle.tasksContainer}>
                <div className={BodyComponnentStyle.tasksInfo}>
                    <div className={BodyComponnentStyle.tasksCreated}>
                        <span>Tarefas criadas</span>
                        <div>
                            <span className={BodyComponnentStyle.tasksCreatedCount}>{myTasks.length}</span>
                        </div>
                    </div>

                    <div className={BodyComponnentStyle.tasksCompleted}>
                        <span>Concluídas</span>
                        <div>
                            <span className={BodyComponnentStyle.tasksCompletedCount}>{howManyTasksCompleted()}</span>
                        </div>
                    </div>
                </div>

                <div className={BodyComponnentStyle.tasks}>
                    <div className={BodyComponnentStyle.withoutTask}>
                        <img width='56px' src={ClipboardImg}/>    
                        <div>                
                            <strong>Você ainda não tem tarefas cadastradas</strong>
                            <span>Crie tarefas e organize seus itens a fazer</span> 
                        </div>
                    </div>

                    {
                        myTasks.map((task) => {
                            return (                            
                               <Task 
                                    key={task.content}
                                    content={task.content} 
                                    completed={task.completed} 
                                    OnChangeCompleted={handleUpdateCompletedTasksCount}
                                    OnDeleteTask={handleDeleteComment}
                               />
                            )
                        })
                    }
                    
                </div>
            </section>
        </div>
    );
}