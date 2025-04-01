import React, { useState, useRef } from 'react'
import QuestionBox from './components/QuestionBox/QuestionBox'
import {getRelevantArticles, formatSearchResponse} from './logic/logic'
import { Article } from './interfaces/interfaces';
import ChatPage from './components/ChatPage/ChatPage'
import PDFDisplay from './components/PDFDisplay/PDFDisplay'
import './App.css';

function App() {

  const [ctrlF, setCtrlF] = useState<string>('')


  const [leftPaneWidth, setLeftPaneWidth] = useState(50)
  const [rightPaneWidth, setRightPaneWidth] = useState(50)

  
  const resizePanes = (e: MouseEvent) => {
    // x coordinate of mouse out of 100
    const relativeMousePosition = (e.clientX / window.innerWidth) * 100
    
    setLeftPaneWidth(relativeMousePosition)
    setRightPaneWidth(100 - relativeMousePosition)
  }

  const stopResize = (e: MouseEvent) => {
    document.removeEventListener('mousemove', resizePanes)
    document.removeEventListener('mouseup', stopResize)
  }

  const startResize = (e: React.MouseEvent<HTMLElement>) => {
    document.addEventListener('mousemove', resizePanes);
    document.addEventListener('mouseup', stopResize);
  }

  return (
    <div className='app'>
      
      <div style={{ width: `${leftPaneWidth}%` }}>
        <ChatPage ctrlF={ctrlF} setCtrlF={setCtrlF}/>
      </div>
      <div className='divider' onMouseDown={startResize}></div>
      <div style={{ width: `${rightPaneWidth}%` }}>
        <PDFDisplay ctrlF={ctrlF} setCtrlF={setCtrlF}/>
      </div>  
    </div> 
  );
}

export default App;
