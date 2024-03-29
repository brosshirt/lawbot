import React, { useState } from 'react'
import InputBox from './components/InputBox/InputBox'
import ChatDisplay from './components/ChatDisplay/ChatDisplay'
import {getChatResponse} from './logic/logic'
import './App.css';

function App() {

  const [chatResponse, setChatResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const onSend = (userInput: string) => {
    setLoading(true)
    
    getChatResponse(userInput).then(response => {
      setChatResponse(response)
      setLoading(false)
    });
  };


  return (
    <div className='chatpage'> 
      <div></div> 
      <ChatDisplay chatResponse={chatResponse}/>
      <InputBox loading={loading} onSend={onSend}/>
    </div>
  );
}

export default App;
