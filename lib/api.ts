// クライアントサイドのAPI呼び出し関数

export async function ask(message: string): Promise<string | null> {
  try {
    const response = await fetch('/api/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch AI response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error in ask function:', error);
    return null;
  }
}