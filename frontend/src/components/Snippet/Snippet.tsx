import React, { useState, SetStateAction, useEffect  } from 'react'
import { Article } from '../../interfaces/interfaces';
import './Snippet.css'



interface SnippetProps {
    article: Article;
    ctrlF: string;
    setCtrlF: React.Dispatch<SetStateAction<string>>
}

function cleanText(original_text: string): string {
    return original_text.replaceAll('\n', ' ')
}

function Snippet({ article, ctrlF, setCtrlF }: SnippetProps) {
    
    const [innerHtml, setInnerHtml] = useState<{ __html: string }>({__html: cleanText(article.original_text)}) 

    const search = (event: React.MouseEvent<HTMLDivElement>) => {
        const text = event.currentTarget.textContent as string
        setCtrlF(text)
    } 


    useEffect(() => {
        if (!ctrlF){
            return
        }

        const plainText = cleanText(article.original_text)

        const highLightedCtrlF = plainText.replace(ctrlF, `<span style="background-color: #f4cea3"> ${ctrlF} </span>`)

        
        setInnerHtml({__html: highLightedCtrlF})
    }, [ctrlF])





    return (
        <div className="snippet" onClick={search}><p dangerouslySetInnerHTML={innerHtml}/></div>
    );
}

export default Snippet;