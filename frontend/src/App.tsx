import React, { useState } from 'react'
import QuestionBox from './components/QuestionBox/QuestionBox'
import ChatDisplay from './components/ChatDisplay/ChatDisplay'
import {getLawbotJson, formatChatResponse} from './logic/logic'
import './App.css';


function App() {

  const [chatResponse, setChatResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const onSend = async (question: string) => {
    setLoading(true)

    // Response from backend
    const lawbotJson = await getLawbotJson(question)
    
    setChatResponse(formatChatResponse(lawbotJson))
    setLoading(false)
  };


  return (
    <div className='chatpage'> 
      <div></div> 
      <ChatDisplay chatResponse={chatResponse}/>
      <QuestionBox loading={loading} onSend={onSend}/>
    </div>
  );
}

export default App;
