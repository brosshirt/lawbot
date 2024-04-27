import React, { useState } from 'react'
import QuestionBox from './components/QuestionBox/QuestionBox'
import ChatDisplay from './components/ChatDisplay/ChatDisplay'
import SearchDisplay from './components/SearchDisplay/SearchDisplay'
import {getRelevantArticles, formatSearchResponse} from './logic/logic'
import { Article } from './interfaces/interfaces';
import ChatPage from './components/ChatPage/ChatPage'
import PDFDisplay from './components/PDFDisplay/PDFDisplay'
import './App.css';

function App() {

  const [ctrlF, setCtrlF] = useState<String>('')

  const searchSourceText = (text: string) => {
    setCtrlF(text)
  }


  return (
    <div className='app'>
      <ChatPage searchSourceText={searchSourceText}/>
      <PDFDisplay/>
    </div> 
  );
}

export default App;
