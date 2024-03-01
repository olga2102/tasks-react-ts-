import { TextField } from '@mui/material';
import { useState } from 'react';
import React, { ChangeEvent } from 'react';

type EditableSpanPropsType = {
    title: string,
    onChangeTitleHandler: (newValue: string) => void
}

const EditableSpan = ({title, onChangeTitleHandler}: EditableSpanPropsType) =>  {
    const [editMode, setEditMode] = useState(false);
    const [titleTask, setTitleTask] = useState('');

    const MakeTrueEditMode = () => {
        setEditMode(true);
        setTitleTask(title)
    }

    const MakeFalseEditMode = () => {
        setEditMode(false);
        onChangeTitleHandler(titleTask);
    }

    const ChangeTitleTask = (e: ChangeEvent<HTMLInputElement>) => {
        setTitleTask(e.target.value);
    }
    
    return (
        editMode ? 
            <TextField value={titleTask} onBlur={MakeFalseEditMode} autoFocus onChange={ChangeTitleTask}/> : 
            <span onDoubleClick={MakeTrueEditMode}>{title}</span>
        
    )
}

export default EditableSpan;