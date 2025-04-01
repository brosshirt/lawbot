import React, {useState, SetStateAction} from 'react'
import Snippet from '../Snippet/Snippet'
import { Article, ChatResponse } from '../../interfaces/interfaces';
import './ChatDisplay.css'


interface ChatDisplayProps {
    chatResponse: ChatResponse | undefined
    ctrlF: string
    setCtrlF: React.Dispatch<SetStateAction<string>>
}

function ChatDisplay({ chatResponse, ctrlF, setCtrlF }: ChatDisplayProps) {
    
    
    return (
        <div className="chat-display">
            <p>{chatResponse?.gptResponse}</p> <br /><br />
            {chatResponse && (<b>NOTES</b>)}
            {chatResponse?.articles.map((article,index) => (
                <Snippet key={index} article={article} ctrlF={ctrlF} setCtrlF={setCtrlF}/>
            ))}
        </div>
    )
}



export default ChatDisplay;