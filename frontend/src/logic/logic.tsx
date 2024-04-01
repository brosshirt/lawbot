

export async function getChatResponse(userInput: string): Promise<string> {
    const response = await fetch('http://127.0.0.1:5000/', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput })
    });

    if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json(); // or response.json() if your server responds with JSON
    return data.lebron;
}
