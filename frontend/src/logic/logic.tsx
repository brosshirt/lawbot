

export async function getChatResponse(userInput: string): Promise<string> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(userInput), 3000);
    });
}