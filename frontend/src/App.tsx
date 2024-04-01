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
      
      let formattedArticles = ""

      for (const article of response.articles){
        formattedArticles += article.original_text + "\n\n"
      }



      const chatResponseAndArticles = `
        ${response.chatResponse}
      
        ${JSON.stringify(formattedArticles)}
      `
      
      setChatResponse(chatResponseAndArticles)
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
