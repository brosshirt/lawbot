import React, { useState } from 'react'
import QuestionBox from '../QuestionBox/QuestionBox'
import ChatDisplay from '../ChatDisplay/ChatDisplay'
import SearchDisplay from '../SearchDisplay/SearchDisplay'
import {getRelevantArticles, formatSearchResponse} from '../../logic/logic'
import { Article } from '../../interfaces/interfaces';
import './ChatPage.css';


interface ChatPageProps {
    searchSourceText: (text: string) => void 
}

function ChatPage({searchSourceText}: ChatPageProps) {

  const [relevantArticles, setRelevantArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)

  const onSend = async (question: string) => {
    setLoading(true)

    // Response from backend
    const chunks: Article[] = await getRelevantArticles(question)
    
    // setSearchResponse(formatSearchResponse(lawbotJson))
    setRelevantArticles(chunks)
    setLoading(false)
  };


  return (
    <div className='chatpage'> 
      <div></div> 
      <SearchDisplay articles={relevantArticles} searchSourceText={searchSourceText}/>
      <QuestionBox loading={loading} onSend={onSend}/>
    </div>
  );
}

export default ChatPage;


