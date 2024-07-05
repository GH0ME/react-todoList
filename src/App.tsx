import React, { useCallback, useState } from 'react';
import './App.css';
import styled from '@emotion/styled';
import { Input } from './components/Input';
import { TodoItem } from './components/TodoItem';
import { useMediaQuery, useTheme } from '@mui/material';

export interface todoProps {
  id: string
  state: boolean
  name: string
}

function App() {
  const [todoList,setTodoList] = useState<todoProps[]>([])
  const theme = useTheme()
  const phoneScreen = useMediaQuery(theme.breakpoints.down('sm'))
  
  const addTodo = useCallback((todo:todoProps)=>{
    setTodoList([...todoList,todo])
  },[todoList])

  const removeTodo = useCallback((todoId:string)=>{
    setTodoList(todoList.filter(todo=>todo.id!==todoId))
  },[todoList])

  const setTodo = useCallback((todoId:string,name?:string)=>{
    setTodoList(todoList.map((todo)=>{
      if(todo.id===todoId){
        return name ? {...todo,name} : {...todo,state:!todo.state}
      }
      return todo
    }))
  },[todoList])

  return (
    <div className="App">
      <div className="App-header">
        <h2 style={{color:'#333333'}}>计划清单</h2>
        <MainBox phoneScreen={phoneScreen}>
          {/* input */}
          <Input addTodo={addTodo} />
          {/* list */}
          <WriteBox phoneScreen={phoneScreen}>
            {/* <p style={{margin:'0px'}}>计划完成进度</p> */}
            {
            todoList.length>0?
              <div id='todoList'>
                {todoList.map((item)=><TodoItem key={item.id} todo={item} removeTodo={removeTodo} setTodo={setTodo} />)}
              </div>
            :
              <div style={{fontSize:'1.5rem',color:'#7e7e7e'}}>清单中暂时没有计划~</div>
            }
          </WriteBox>
        </MainBox>
        <h2 style={{color:'#ffeed7'}}>积极对待每一天！！</h2>
      </div>
    </div>
  );
}

export default App;

export interface phoneScreenProps{
  phoneScreen: boolean
}

const MainBox = styled('div')(({phoneScreen}:phoneScreenProps)=>`
  display: flex;
  column-gap: ${phoneScreen?'0':'10rem'};
  row-gap: ${phoneScreen?'2rem':'0'};
  height: ${phoneScreen?'70vh':'50vh'};
  flex-direction: ${phoneScreen?'column':'row'};
`)



export const WriteBox = styled('div')(({phoneScreen}:phoneScreenProps)=>`
  padding: 1.5rem;
  border-radius: 1rem;
  background: #ebebeba9;
  color: #000000;
  display: flex;
  flex-direction: ${phoneScreen?'row':'column'};
  row-gap: ${phoneScreen?'0':'1rem'};
  justify-content: ${phoneScreen?'space-around':'center'};
  /* max-height: 50vh;
  overflow-y: auto; */
  height: fit-content;
  box-sizing: border-box;
  box-shadow: 4px 4px 8px 0px rgba(0, 0, 0, 0.75);

  #todoList {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
    max-height: ${phoneScreen?'50vh':'45vh'};
    overflow-y: auto;
    height: fit-content;
    ::-webkit-scrollbar {
    width: .25rem;
    right: .25rem;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: .2rem;
      background-color: #ffbb00;
    }
    ::-webkit-scrollbar-track {
      border-radius: 0;
      background-color: #525252;
    }
  } 
`)