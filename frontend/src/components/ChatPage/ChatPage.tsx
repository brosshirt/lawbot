import React, { useState, SetStateAction } from 'react'
import QuestionBox from '../QuestionBox/QuestionBox'
import ChatDisplay from '../ChatDisplay/ChatDisplay'
import {getRelevantArticles, getChat} from '../../logic/logic'
import { Article, ChatResponse } from '../../interfaces/interfaces';
import './ChatPage.css';


interface ChatPageProps {
    ctrlF: string
    setCtrlF: React.Dispatch<SetStateAction<string>>
}

function ChatPage({ctrlF, setCtrlF}: ChatPageProps) {
  const [chatResponse, setChatResponse] = useState<ChatResponse>()
  const [loading, setLoading] = useState(false)

  const onSend = async (question: string) => {
    setLoading(true)

    const chatResponse = await getChat(question) 
    
    // setSearchResponse(formatSearchResponse(lawbotJson))
    setChatResponse(chatResponse)
    setLoading(false)
  };


  return (
    <div className='chatpage'> 
      <div></div> 
      <ChatDisplay chatResponse={chatResponse} ctrlF={ctrlF} setCtrlF={setCtrlF}/>
      <QuestionBox loading={loading} onSend={onSend}/>
    </div>
  );
}

export default ChatPage;


