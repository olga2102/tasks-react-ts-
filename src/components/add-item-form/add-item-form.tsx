import React, { ChangeEvent, FormEvent } from 'react';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';

import "./add-item-form.css";

type AddItemFormType = {
    addItem: (title: string)=>void,
}

const AddItemForm = ({addItem }: AddItemFormType) => {
    const [newTaskValue, setnewTaskValue] = useState('');
    const [error, setError] = useState(false);

    const addNewTask = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      
        if(newTaskValue.trim() === '') {
          setError(true);
        } else {
          setError(false);
        
          addItem(newTaskValue)  
          
          setnewTaskValue('');
        }
       
    }

    const changeTaskValue = (e: ChangeEvent<HTMLInputElement>) => {
        setnewTaskValue(e.target.value);
        if (error) setError(false);
    }

    return (
        <div className='add-form-wrapper'>
             <form className='add-form' onSubmit={addNewTask}>
                <div className='add-form__inner'>
                    <TextField value={newTaskValue} label="Type text" variant='outlined' error={!!error} onChange={changeTaskValue}/>
                    {error ? <p className='add-form__error'>This field is required</p> : ''}
                </div>
                <button className='add-form__button' aria-label='add-item'><AddIcon color="primary" /></button>
            </form>
        </div>
    )
}

export default AddItemForm;