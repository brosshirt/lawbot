import React, { useState } from 'react'
import QuestionBox from './components/QuestionBox/QuestionBox'
import ChatDisplay from './components/ChatDisplay/ChatDisplay'
import SearchDisplay from './components/SearchDisplay/SearchDisplay'
import {getRelevantArticles, formatSearchResponse} from './logic/logic'
import { Article } from './interfaces/interfaces';
import './App.css';

function App() {


  // You should be passing html to the chatDisplay I guess
  const [relevantArticles, setRelevantArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(false)

  const onSend = async (question: string) => {
    setLoading(true)

    // Response from backend
    const chunks: Article[] = await getRelevantArticles(question)
    
    console.log(chunks)

    // setSearchResponse(formatSearchResponse(lawbotJson))
    setRelevantArticles(chunks)
    setLoading(false)
  };


  return (
    <div className='chatpage'> 
      <div></div> 
      <SearchDisplay articles={relevantArticles}/>
      <QuestionBox loading={loading} onSend={onSend}/>
    </div>
  );
}

export default App;
