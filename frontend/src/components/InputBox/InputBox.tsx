import React, { useState } from 'react'
import './InputBox.css'




function TextBox(){



    return (
        <div className='chatbox-input'>
            <textarea 
                placeholder="Write your question here..."
                value="hello"
            ></textarea>
        </div>
    );
}

export default TextBox;