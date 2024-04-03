import React, { useState } from 'react'
import {marked} from 'marked';
import QuestionBox from './components/QuestionBox/QuestionBox'
import ChatDisplay from './components/ChatDisplay/ChatDisplay'
import {getLawbotJson} from './logic/logic'
import './App.css';



function formatChatResponse(lawbotJson: any){
  let formattedArticles = ''

  for (const article of lawbotJson.articles){
    formattedArticles += article.original_text.replaceAll('\n', '\\n') + '<br><br>#####<br><br>'
  }

  const output = 
`${marked.parse(lawbotJson.gptResponse)}
<h4><strong>Notes</strong></h4>
${formattedArticles}`

  return output
}


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
