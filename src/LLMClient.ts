import axios from 'axios';

export class LLMClient {
  private static openAiApiKey: string;

  // -------- Above Private --------

  public static setOpenAiApiKey(key: string) {
    if (!key) {
      return;
    }

    this.openAiApiKey = key;
  }

  public static async askToGPT_3_dot_5(question: string): Promise<string> {
    if (!LLMClient.openAiApiKey) {
      throw new Error('API key not set');
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-16k',
        messages: [
          {
            role: 'system',
            content:
              'You are an assistant who helps create params for RESTful API.',
          },
          {
            role: 'user',
            content: question,
          },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${LLMClient.openAiApiKey}`,
        },
      }
    );

    console.log(response.data.choices[0].message.content);

    return response.data.choices[0].message.content;
  }
}
