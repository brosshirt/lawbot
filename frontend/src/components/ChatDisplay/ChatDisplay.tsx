import React, {useState} from 'react'
import './ChatDisplay.css'


interface ChatDisplayProps {
    chatResponse: string;
}

function ChatDisplay({ chatResponse }: ChatDisplayProps) {
    return (
        <div className='chat-display' dangerouslySetInnerHTML={{ __html: chatResponse }}></div>
    );
}



export default ChatDisplay;