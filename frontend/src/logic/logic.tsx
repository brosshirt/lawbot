import {marked} from 'marked';
import { Article } from '../interfaces/interfaces';




export async function getRelevantArticles(question: string): Promise<Article[]> {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/search`, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question })
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json(); 
    
    return data.articles;
}

export function formatChatResponse(lawbotJson: any){
    let formattedArticles = ''
  
    for (const article of lawbotJson.articles){
      formattedArticles += article.original_text.replaceAll('\n', '\\n') + '<br><br>#####<br><br>'
    }
  
    const output = 
  `${marked.parse(lawbotJson.gptResponse)}
  <h4><strong>Notes</strong></h4>
  ${formattedArticles}`
  
    return output
  }

export function formatSearchResponse(lawbotJson: any){
  let formattedArticles = ''

  for (const article of lawbotJson.articles){
    let text = `${article.original_text.substring(0, 100).replaceAll('\n', ' ')}`


    


    
    
    formattedArticles += text + '<br><br>#####<br><br>'
  }

  const output = 
`<h4><strong>Notes</strong></h4>
${formattedArticles}`

  return output
}
