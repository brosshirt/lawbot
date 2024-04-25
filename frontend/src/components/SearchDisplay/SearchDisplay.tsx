import React, {useState} from 'react'
import Snippet from '../Snippet/Snippet'
import { Article } from '../../interfaces/interfaces';
import './SearchDisplay.css'


interface SearchDisplayProps {
    articles: Article[];
}

function SearchDisplay({ articles }: SearchDisplayProps) {
    console.log('articles', articles)
    
    return (
        <div className="chat-display">
            {articles.map((article,index) => (
                <Snippet key={index} article={article}/>
            ))}
        </div>
    )
}



export default SearchDisplay;