# Steven's Food Diary Web App

Beautiful public showcase of Steven's food adventures! 🍽️✨

## Quick Deploy

### Vercel (Recommended)
1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically
4. Get public URL: `stevens-food-diary.vercel.app`

### Netlify
1. Push to GitHub  
2. Connect to Netlify
3. Build command: `npm run build && npm run export`
4. Publish directory: `out`

### Local Development
```bash
npm install
npm run dev
```

## Features
- ✅ Instagram-style photo gallery
- ✅ Restaurant ratings and reviews  
- ✅ Mobile-responsive design
- ✅ Beautiful food-photography UI
- ✅ Ready for CLI tool integration
- ✅ Public sharing ready

## Integration with CLI Tool
The CLI tool saves data to `~/stevens-food-diary/entries.json`. To sync with the website:

1. Export from CLI: `food-diary export` 
2. Upload the JSON data to the web app
3. Photos sync automatically

## Public URL Structure
- Home: `/` - Gallery of all entries
- Individual entries: `/entry/[id]` - Detailed view
- Search: `/?search=ramen` - Filter results

Perfect for sharing Steven's food adventures with friends and family! 📱🌮🍜