import { Button, TextField, useMediaQuery, useTheme } from '@mui/material'
import React, { useRef, useState } from 'react'
import { todoProps, WriteBox,  } from '../App'
import AddIcon from '@mui/icons-material/Add';

interface InputProps {
  addTodo: (todo: todoProps) => void
}

export const Input: React.FC<InputProps> = ({addTodo}) => {
  const theme = useTheme()
  const phoneScreen = useMediaQuery(theme.breakpoints.down('sm'))
  const [error,setError] = useState(false)
  const inputRef = useRef<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
    if(error){setError(false)}
    inputRef.current = e.target.value
  }

  const handleAddTodo = ()=>{
    if(inputRef.current.length<1){
      setError(true)
      return
    }
    const todo: todoProps = { 
      id: `todoId${Number(Math.random().toFixed(5))*100000}`,
      name: inputRef.current, 
      state: false }
    addTodo(todo)
  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLDivElement>)=>{
    e.key==='Enter'&&handleAddTodo()
  }
  return (
    <WriteBox phoneScreen={phoneScreen}>
      <TextField error={error} label={error?'无法添加空计划':'请输入你的计划'} variant="outlined" onChange={handleChange} onKeyDown={handleKeyDown}/>
      <Button variant="contained" onClick={handleAddTodo}>
        {phoneScreen?<AddIcon/>:'添加计划'}
      </Button>
    </WriteBox>
  )
}