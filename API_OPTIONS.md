# Topic API Options

The app now uses APIs to generate random topics instead of hardcoded values. Here are your options:

## ✅ Current: Adviceslip API (Free, No Auth)

**What it does:** Returns random advice/wisdom  
**Endpoint:** `https://api.adviceslip.com/advice`  
**Response:** JSON with `slip.advice` field  
**Pros:** Free, no authentication, no rate limits (mostly)  
**Cons:** Topics are advice-based, not speaking topics specifically  

**Implementation in code:**
```typescript
const generateTopic = async () => {
  const response = await fetch('https://api.adviceslip.com/advice')
  const data = await response.json()
  setTopic(`Discuss: ${data.slip.advice}`)
}
```

---

## 🤖 Alternative: OpenAI API (Requires API Key)

**What it does:** Generates completely custom speaking topics  
**Cost:** ~$0.0001 per topic  
**Setup:**
1. Get API key from https://platform.openai.com
2. Add to `.env.local`:
```
NEXT_PUBLIC_OPENAI_API_KEY=your_key_here
```

**Implementation:**
```typescript
const generateTopic = async () => {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [{
        role: 'user',
        content: 'Generate ONE random interesting speaking topic in 5-10 words. Only respond with the topic, nothing else.'
      }],
    }),
  })
  const data = await response.json()
  setTopic(data.choices[0].message.content)
}
```

---

## 🎨 Alternative: Quotes API (Free)

**What it does:** Returns random inspirational quotes  
**Endpoint:** `https://api.quotable.io/random`  
**Response:** JSON with `content` field  
**Pros:** Free, diverse topics  

**Implementation:**
```typescript
const generateTopic = async () => {
  const response = await fetch('https://api.quotable.io/random')
  const data = await response.json()
  setTopic(`Discuss this quote: "${data.content}" - ${data.author}`)
}
```

---

## 📚 Alternative: Random Word + Context (Hybrid)

Combine multiple free APIs to generate topics. For example:
1. Get a random word
2. Get random quotes
3. Combine them into a topic

---

## 🔧 Custom Backend (Best Control)

Create your own API endpoint:

**Backend (Node.js/Express example):**
```javascript
app.get('/api/topic', (req, res) => {
  const topics = ['AI in education', 'Remote work', ...]
  const random = topics[Math.floor(Math.random() * topics.length)]
  res.json({ topic: random })
})
```

**Frontend:**
```typescript
const generateTopic = async () => {
  const response = await fetch('/api/topic')
  const data = await response.json()
  setTopic(data.topic)
}
```

---

## 🚀 How to Switch APIs

Open `src/app/page.tsx` and modify the `generateTopic()` function to use your preferred API.

## Recommendation

- **Quick start:** Use **Adviceslip** (current setup) ✓
- **Best quality:** Use **OpenAI** (requires paid API key)
- **Free alternative:** Use **Quotable.io** (quotes)
- **Most control:** Use **Custom Backend** (create API endpoint)
