import { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import './App.css';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import TasksList from './components/tasks-list/tasks-list';
import AddItemForm from './components/add-item-form/add-item-form';
import Container from '@mui/material/Container';
import { AppBar, Grid, Paper } from '@mui/material';

export type TaskType = {
  id: number | string,
  title: string,
  isDone: boolean
}

export type filterValue = 'all' | 'active' |'completed';

type TodoListType = {
  id: string | number,
  title: string, 
  filter: filterValue
}

type TaskStateType = {
  [key: string] : Array<TaskType>
}


function App() {

const deleteTask = (id:number | string, todoListId:number | string) => {
  let newTasks = tasks[todoListId];
  let filteredTasks = newTasks.filter(task => task.id !== id);
  tasks[todoListId] = filteredTasks;
  setTasks({...tasks});
}

const changeFilter = (value: filterValue, todoListId: number | string) => {
  let updatedTodoLists = todoLists.map(tl => {
    if (tl.id === todoListId) {
      tl.filter = value;
    }
    return tl;
  })
  setTodoList(updatedTodoLists);
  // let todoList = todoLists.find(tl => tl.id === todoListId);
  // if (todoList) {
  //   todoList.filter = value;
  //   setTodoList([...todoLists]);
  // }
}

const changeDone = (id:number | string, todoListId: number | string) => {
  let newTasks = tasks[todoListId];

  let updatedTasks = newTasks.map(task => {
    if (task.id === id) task.isDone = !task.isDone;
      return task;
  });
  tasks[todoListId] = updatedTasks;
  setTasks({...tasks});
}

const addTaskInTodoList = (title: string, todoListId:number | string) => {
 
  let newTask = {
    id: uuidv4(),
    title: title,
    isDone: false
  }

  let newTasks = tasks[todoListId];
  let updatedNewTasks = [newTask, ...newTasks];
  tasks[todoListId] = updatedNewTasks;
  setTasks({...tasks});
}

const changeTaskTitle = (newTitle: string, todoListId: number | string, id:number | string) => {
  let newTasks = tasks[todoListId];
  let updatedTasks = newTasks.map(task => {
    if (task.id === id) task.title = newTitle;
      return task;
  });
  tasks[todoListId] = updatedTasks;
  setTasks({...tasks});
}

const removeTodoList = (todoListId:number | string) => {
  let filteredTodoList = todoLists.filter(tl => tl.id !== todoListId);
  setTodoList(filteredTodoList);
  delete tasks[todoListId];
  setTasks({...tasks});
}

let todoListId1 = uuidv4();
let todoListId2 = uuidv4();

let [todoLists, setTodoList] = useState<Array<TodoListType>>([
  {id: todoListId1 , title: "What to learn", filter: "active"},
  {id: todoListId2, title: "What to read", filter: "completed"}
]);

let [tasks, setTasks] = useState<TaskStateType>({
  [todoListId1]:  [
    {
      id: uuidv4(),
      title: 'CSS',
      isDone: true
    },
    {
      id: uuidv4(),
      title: 'JS',
      isDone: true
    },
    {
      id: uuidv4(),
      title: 'React',
      isDone: false
    }],

    [todoListId2]:  [
      {
        id: uuidv4(),
        title: 'War and Peace',
        isDone: true
      },
      {
        id: uuidv4(),
        title: 'Cinderella',
        isDone: false
      }
    ]
})

const addTodoList = (title: string) => {
  let newTodoList: TodoListType = {
    id: uuidv4(),
    title: title,
    filter: 'all'
  }
  setTodoList([...todoLists, newTodoList]);
  setTasks({...tasks, [newTodoList.id]: []})
}
  
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>      
        <AddItemForm  addItem={addTodoList}/>
        <Grid container spacing={3}>
          {todoLists.map(tl=>{
            let filteredTasks:TaskType[];

            if (tl.filter === 'completed') {
              filteredTasks = tasks[tl.id].filter(task => task.isDone === true)
            } else if (tl.filter === 'active') {
              filteredTasks = tasks[tl.id].filter(task => task.isDone === false)
            } 
            else {
              filteredTasks = tasks[tl.id];
            }

            return <Grid item>
              <Paper elevation={3}>
                <TasksList 
                  title={tl.title} 
                  key={tl.id}
                  id={tl.id}
                  tasks={filteredTasks} 
                  deleteTask={deleteTask} 
                  filter={tl.filter}
                  changeFilter={changeFilter} 
                  changeDone={changeDone}
                  addTaskInTodoList={addTaskInTodoList}
                  removeTodoList={removeTodoList}
                  changeTaskTitle = {changeTaskTitle}
                />
              </Paper>
          </Grid>
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
