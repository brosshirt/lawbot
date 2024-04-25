import React, { useState } from 'react'
import { Article } from '../../interfaces/interfaces';
import './Snippet.css'



interface SnippetProps {
    article: Article;
}

function cleanText(original_text: string): string {
    return original_text.replaceAll('\n', ' ')
}

function searchSourceText(event: React.MouseEvent<HTMLDivElement>){
    const text = event.currentTarget.textContent
    
    // In the future we're going to need to update some state variable that's going to affect how the second half of this UI works. 



    console.log(text)
}

function Snippet({ article }: SnippetProps) {
    
    const text = cleanText(article.original_text)


    return (
        <div className="snippet" onClick={searchSourceText}><p>{text}</p></div>
    );
}

export default Snippet;