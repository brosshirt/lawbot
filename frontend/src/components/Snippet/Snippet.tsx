import React, { useState } from 'react'
import { Article } from '../../interfaces/interfaces';
import './Snippet.css'



interface SnippetProps {
    article: Article;
    searchSourceText: (text: string) => void 
}

function cleanText(original_text: string): string {
    return original_text.replaceAll('\n', ' ')
}

function Snippet({ article, searchSourceText }: SnippetProps) {
    
    const text = cleanText(article.original_text)

    const search = (event: React.MouseEvent<HTMLDivElement>) => {
        const text = event.currentTarget.textContent as string
        searchSourceText(text)
    } 


    return (
        <div className="snippet" onClick={search}><p>{text}</p></div>
    );
}

export default Snippet;