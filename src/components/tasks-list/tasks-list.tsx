import type { TaskType, filterValue } from '../../App';
import AddItemForm from '../add-item-form/add-item-form';
import EditableSpan from '../editable-span/editable-span';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

import './tasks-list.css';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';

type TasksListProps = {
    title?: string,
    id: number | string,
    tasks: TaskType[],
    deleteTask: (id:number | string, todoListId:number | string) => void,
    filter: filterValue,
    changeFilter: (value: filterValue, todoListId: number | string)=>void,
    changeDone: (id:number | string, todoListId: number | string) => void,
    addTaskInTodoList: (title: string, todoListId:number | string)=>void,
    removeTodoList: (todoListId: number | string) => void,
    changeTaskTitle: (newTitle: string, todoListId: number | string, id:number | string) => void
}

const TasksList = ({title, tasks, id, deleteTask, changeFilter, filter, changeDone, addTaskInTodoList, removeTodoList, changeTaskTitle}: TasksListProps) => {
    
    const addTask = (title: string) => {
        addTaskInTodoList(title, id)
    }
    
    return (
        <div className='task-item '>
        <IconButton onClick={()=>removeTodoList(id)}><HighlightOffIcon /></IconButton>
        <h3>{title}</h3>
        <div className='task-button'>
            <Button variant={filter==='all' ? 'contained' : 'outlined'} color="success" className={filter==='all' ? 'filter-active' : ''} onClick={() => changeFilter('all', id)}>All</Button>
            <Button variant={filter==='active' ? 'contained' : 'outlined'} color="primary" className={filter==='active' ? 'filter-active' : ''} onClick={() => changeFilter('active', id)}>Active</Button>
            <Button variant={filter==='completed' ? 'contained' : 'outlined'} color="secondary" className={filter==='completed' ? 'filter-active' : ''} onClick={() => changeFilter('completed', id)}>Completed</Button>
        </div>
            <ul className='tasks-list'>
                {tasks.map(task=> {
                    const onChangeTitleHandler = (newValue: string) => {
                        changeTaskTitle(newValue, id, task.id)
                    }
                    return (
                        <li key={task.id}>
                            <Checkbox checked={task.isDone} onChange={()=>changeDone(task.id, id)}/>
                            <EditableSpan title = {task.title} onChangeTitleHandler={onChangeTitleHandler}/>
                            <IconButton onClick={()=>deleteTask(task.id, id)} aria-label="delete"><DeleteOutlineIcon /></IconButton>
                        </li>
                    )
                })}
            </ul>
            <AddItemForm addItem={addTask}/>
        </div>
    )
}

export default TasksList;
