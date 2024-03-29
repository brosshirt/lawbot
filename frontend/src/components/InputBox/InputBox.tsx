import React, { useState } from 'react'
import './InputBox.css'

interface TextBoxProps {
    loading: boolean
    onSend: (arg1: string) => void
}


function TextBox({loading, onSend}: TextBoxProps){

    const [userInput, setUserInput] = useState('')

    const handleKeyDown = (e:any) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            onSend(e.target.value)
        }
    };

    return (
        <div className='chatbox-input'>
            <textarea 
                placeholder="Write your question here..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                disabled={loading}
                onKeyDown={handleKeyDown}
            ></textarea>
        </div>
    );
}

export default TextBox;