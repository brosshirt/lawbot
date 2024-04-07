import {marked} from 'marked';

export async function getLawbotJson(question: string) {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}`, {
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
    
    return data;
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
