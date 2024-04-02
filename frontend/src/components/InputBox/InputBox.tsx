import React, { useState } from 'react'
import './InputBox.css'

interface TextBoxProps {
    loading: boolean
    onSend: (arg1: string) => void
}


function TextBox({loading, onSend}: TextBoxProps){

    const [question, setQuestion] = useState('')

    const handleKeyDown = (e:any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            onSend(question)
        }
    };

    return (
        <div className='chatbox-input'>
            <textarea 
                placeholder="Write your question here..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                disabled={loading}
                onKeyDown={handleKeyDown}
            ></textarea>
            <div className='button-container'>
                <button disabled={loading} onClick={() => onSend(question)}>↑</button>
            </div>
            
        </div>
    );
}

export default TextBox;