import axios from 'axios';

export class LLMClient {
  private static apiKey: string;

  // -------- Above Private --------

  public static setOpenAiApiKey(key: string) {
    if (!key) {
      return;
    }

    this.apiKey = key;
  }

  public static async askToGPT_3_dot_5(question: string): Promise<string> {
    if (!LLMClient.apiKey) {
      throw new Error('API key not set');
    }

    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo-16k',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.',
            // TODO: RESTful API를 위한 적절한 프롬프트로 대체해보자.
            // content: 'You are an assistant who helps create params for RESTful API.'
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
          'Authorization': `Bearer ${LLMClient.apiKey}`,
        },
      }
    );

    console.log(response);

    return response.data.choices[0].message.content;
  }
}
