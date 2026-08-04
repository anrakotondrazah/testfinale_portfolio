# Andry Eudes — Portfolio

## Deploy on Vercel
1. Push to GitHub
2. Import on vercel.com
3. Add env variable: `GROQ_API_KEY` = your Groq API key
4. Deploy — no build command needed

## Structure
```
index.html          main page
assets/css/main.css all styles
assets/js/hero.js   spotlight effect
assets/js/about.js  scroll videos
assets/js/contact.js reveals + nav + marquee
assets/js/lang.js   EN/FR toggle
assets/js/aria.js   ARIA chat
api/chat.js         Groq serverless function
img/avatar.png      profile photo
```

## Environment Variables
| Variable | Description |
|---|---|
| GROQ_API_KEY | Your Groq API key (set in Vercel dashboard) |
