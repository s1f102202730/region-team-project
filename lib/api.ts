// クライアントサイドのAPI呼び出し関数

interface AskPayload {
  message: string;
  season: string;
  time: string;
  weather: string;
}

export async function ask(payload: AskPayload) {
  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Error asking the API:", error);
    return null;
  }
}
