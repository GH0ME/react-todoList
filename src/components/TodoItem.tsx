import React, { useRef, useState } from 'react'
import { todoProps } from '../App'
import styled from '@emotion/styled'
import { Tooltip, Checkbox, IconButton, TextField } from '@mui/material'
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import DeleteIcon from '@mui/icons-material/Delete';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

interface TodoItemProps {
  todo: todoProps
  removeTodo: (todoId: string) => void
  setTodo: (todoId: string, name?: string) => void
}

export const TodoItem: React.FC<TodoItemProps> = ({todo,removeTodo,setTodo}) => {
  const [editing,setEditing] = useState(false)
  const [error,setError] = useState(false)
  const nameRef = useRef(todo.name)

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    if(error){setError(false)}
    nameRef.current = e.target.value
  }

  const handleRemoveTodo = ()=>{
    if(window.confirm('确定删除该计划吗？')){
      removeTodo(todo.id)
    }
  }

  const handleSetTodoState = ()=>{
    setTodo(todo.id)
  }

  const handleSetTodoName = ()=>{
    if(nameRef.current.length<1){
      setError(true)
      return
    }
    setEditing(false)
    setTodo(todo.id,nameRef.current)
  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLDivElement>)=>{
    e.key==='Enter'&&handleSetTodoName()
  }
  return (
    <TodoBox state={todo.state}>
      {
      editing?
        <>
          <TextField error={error} label={error?'无法改为空计划':todo.name} onChange={handleChangeName} onKeyDown={handleKeyDown} />
          <IconButton aria-label="delete" color="primary" onClick={handleSetTodoName}>
            <LibraryAddCheckIcon />
          </IconButton>
        </>
      :
        <>
          <Checkbox icon={<BatteryCharging20Icon />} checkedIcon={<BatteryChargingFullIcon />} onClick={handleSetTodoState} />
          <Tooltip title={todo.name} placement='top'>
              <p >{todo.name}</p>
          </Tooltip>
          {/* 编辑 */}
          <IconButton aria-label="delete" color="primary" onClick={()=>{setEditing(true)}} disabled={todo.state}>
            <BorderColorIcon/>
          </IconButton>
          {/* 删除 */}
          <IconButton aria-label="delete" color="error" disabled={todo.state} onClick={handleRemoveTodo}>
            <DeleteIcon/>
          </IconButton>
        </>
      }
    </TodoBox>
  )
}

interface stateProps {
  state: boolean
}

const TodoBox = styled('div')(({state}:stateProps)=>`
  display: flex;
  align-items: center;
  column-gap: 1rem;
  height: 4.5rem;
  min-height: 4.5rem;
  border: 2px solid #545ffc;
  box-sizing: border-box;
  border-radius: 5px;
  padding-left: .4rem;
  margin-right: .4rem;

  p {
    text-align: left;
    width: 10rem;
    line-height: 2rem;
    font-size: 1.5rem;
    margin: 0;
    transition: all 0.4s ease-in-out;
    /* 超出省略号显示 */
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    /* 增加删除线 */
    text-decoration: ${state?'line-through':'none'};
    color: ${state?'#686868':'#000000'};
  }
`)