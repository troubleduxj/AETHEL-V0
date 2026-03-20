import { NeuralConfig } from '../types';

export interface LLMMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface LLMResponse {
  content: string;
  error?: string;
}

export const callLLM = async (
  config: NeuralConfig,
  messages: LLMMessage[]
): Promise<LLMResponse> => {
  if (!config.apiKey) {
    return { content: '', error: 'API Key is missing.' };
  }

  const systemMessage: LLMMessage = {
    role: 'system',
    content: config.customPrompt || 'You are an advanced AI entity in the AETHEL network.'
  };

  const fullMessages = [systemMessage, ...messages];

  try {
    let response;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    };

    switch (config.provider) {
      case 'OpenRouter':
        response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            ...headers,
            'HTTP-Referer': window.location.origin,
            'X-Title': 'AETHEL',
          },
          body: JSON.stringify({
            model: config.modelId || 'openai/gpt-3.5-turbo',
            messages: fullMessages,
          }),
        });
        break;

      case 'OpenAI':
        response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers,
          body: JSON.stringify({
            model: config.modelId || 'gpt-3.5-turbo',
            messages: fullMessages,
          }),
        });
        break;

      case 'Anthropic':
        // Anthropic requires special headers and message format
        response = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            ...headers,
            'x-api-key': config.apiKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: config.modelId || 'claude-3-haiku-20240307',
            max_tokens: 1024,
            system: systemMessage.content,
            messages: messages.map(m => ({ role: m.role, content: m.content })),
          }),
        });
        break;

      case 'Google':
        // Google Gemini API
        const googleUrl = `https://generativelanguage.googleapis.com/v1beta/models/${config.modelId || 'gemini-pro'}:generateContent?key=${config.apiKey}`;
        response = await fetch(googleUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: messages.map(m => ({
              role: m.role === 'user' ? 'user' : 'model',
              parts: [{ text: m.content }]
            })),
            system_instruction: {
              parts: [{ text: systemMessage.content }]
            }
          }),
        });
        break;

      default:
        return { content: '', error: 'Unsupported provider.' };
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { 
        content: '', 
        error: errorData.error?.message || `API Error: ${response.status} ${response.statusText}` 
      };
    }

    const data = await response.json();
    
    // Extract content based on provider
    let content = '';
    if (config.provider === 'Google') {
      content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
    } else if (config.provider === 'Anthropic') {
      content = data.content?.[0]?.text || '';
    } else {
      content = data.choices?.[0]?.message?.content || '';
    }

    return { content };

  } catch (err) {
    console.error('LLM Call Error:', err);
    return { content: '', error: err instanceof Error ? err.message : 'Unknown network error.' };
  }
};
