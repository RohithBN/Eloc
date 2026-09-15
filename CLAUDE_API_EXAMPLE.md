# Using Claude API for Topic Generation

You can also use **Claude API** (Anthropic) to generate intelligent speaking topics.

## Setup

1. Get API key from https://console.anthropic.com
2. Create `.env.local`:
```
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_api_key_here
```

## Implementation

Replace the `generateTopic()` function in `src/app/page.tsx`:

```typescript
const generateTopic = async () => {
  setIsLoadingTopic(true)
  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.NEXT_PUBLIC_ANTHROPIC_API_KEY || '',
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-1',
        max_tokens: 100,
        messages: [
          {
            role: 'user',
            content: 'Generate ONE unique and interesting speaking topic for a presentation practice session. The topic should be engaging, thought-provoking, and take 1-2 minutes to discuss. Respond with only the topic (5-15 words), nothing else.'
          }
        ]
      })
    })
    
    const data = await response.json()
    if (data.content && data.content[0].text) {
      setTopic(data.content[0].text)
    } else {
      throw new Error('Invalid response')
    }
  } catch (error) {
    console.error('Failed to fetch topic:', error)
    // Fallback to local topics
    const randomTopic = FALLBACK_TOPICS[Math.floor(Math.random() * FALLBACK_TOPICS.length)]
    setTopic(randomTopic)
  } finally {
    setIsLoadingTopic(false)
  }
}
```

## Advantages of Claude API

✅ Highest quality topics  
✅ Can customize the prompt for your needs  
✅ Intelligent, context-aware generation  
✅ No content limitations  

## Pricing

- ~$0.003 per topic (very cheap)
- Free tier available with limited requests

## Try it Now

To test, update your environment variable and the function will automatically use Claude API instead.
