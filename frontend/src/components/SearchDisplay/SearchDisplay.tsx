import React, {useState} from 'react'
import Snippet from '../Snippet/Snippet'
import { Article } from '../../interfaces/interfaces';
import './SearchDisplay.css'


interface SearchDisplayProps {
    articles: Article[];
    searchSourceText: (text: string) => void 
}

function SearchDisplay({ articles, searchSourceText }: SearchDisplayProps) {
    console.log('articles', articles)
    
    return (
        <div className="chat-display">
            {articles.map((article,index) => (
                <Snippet key={index} article={article} searchSourceText={searchSourceText}/>
            ))}
        </div>
    )
}



export default SearchDisplay;