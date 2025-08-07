export const handler = async (event) => {
    try {
        const { text } = JSON.parse(event.body);
        const geminiApiKey = process.env.GEMINI_API_KEY;

        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=' + geminiApiKey, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Summarize the following text in a few concise bullet points:\n\n" + text }] }]
            })
        });
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data),
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};