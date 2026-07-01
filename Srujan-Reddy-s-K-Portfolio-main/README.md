# Srujan Reddy's Portfolio

A personal portfolio website for Kindikeri Srujan Kumar Reddy, showcasing skills and projects in Data Science.

## Deployment

### Vercel

This project is optimized for deployment on [Vercel](https://vercel.com/).

1. Push your code to a GitHub/GitLab/Bitbucket repository.
2. Import the project into Vercel.
3. Vercel will automatically detect the Vite configuration.
4. Add the following Environment Variable in the Vercel dashboard:
   - `GEMINI_API_KEY`: Your Google Gemini API key.
5. Click **Deploy**.

### Other Platforms (Netlify, GitHub Pages, etc.)

1. Run the build command:
   ```bash
   npm run build
   ```
2. The production-ready files will be in the `dist` directory.
3. Upload the contents of `dist` to your hosting provider.

**Note for GitHub Pages:** If you are deploying to a subpath (e.g., `username.github.io/repo-name/`), you must update the `base` property in `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/repo-name/',
  // ... other config
})
```

## Environment Variables

Copy `.env.example` to `.env` and fill in your API keys:
```bash
cp .env.example .env
```
