# Speech Practice App

An aesthetic speaking practice application built with Next.js. Practice your presentation skills with customizable timers, random topic generation, and audio recording.

## Features

✨ **Random Topic Generation** - Get a random speaking topic with a single click
⏱️ **Customizable Timers** - Set your own prep time and speaking duration
🎤 **Audio Recording** - Records your speech and allows download
🎨 **Aesthetic UI** - Beautiful, dark interface with smooth animations
📊 **Progress Tracking** - Visual timer with progress circle
⚙️ **Quick Settings** - Change timer durations on the fly

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Extract the zip file
2. Navigate to the project directory:
   ```bash
   cd speech-practice-app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

1. **Generate Topic** - Click "Generate Topic" to get a random speaking subject
2. **Begin Session** - Click "Begin Practice Session" to start
3. **Preparation Phase** - You get 5 minutes (customizable) to prepare your thoughts
4. **Speaking Phase** - Click "Start" to begin the 60-second (customizable) speaking timer. Your speech will be recorded.
5. **Review** - After speaking, review your recording and download if needed

## Customization

Click the ⚙️ settings button in the bottom-right corner to:
- Adjust preparation time (30 seconds to 10 minutes)
- Adjust speaking time (30 seconds to 10 minutes)
- Use quick preset buttons (1m, 3m, 5m, etc.)

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Recording**: Web Audio API
- **Language**: TypeScript

## Building for Production

```bash
npm run build
npm run start
```

## License

Free to use and modify for your purposes.
