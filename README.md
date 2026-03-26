# Filmora BR SEO Optimizer

An advanced SEO tool designed for the Brazilian Filmora market to optimize HTML content, generate metadata, and rewrite contextual elements based on target keywords and specific requirements.

## Deployment to Netlify

To deploy this project to Netlify, follow these steps:

1.  **Push your code to a Git repository** (GitHub, GitLab, or Bitbucket).
2.  **Connect your repository to Netlify**.
3.  **Configure Build Settings**:
    *   **Build command**: `npm run build`
    *   **Publish directory**: `dist`
4.  **Set Environment Variables**:
    *   In the Netlify dashboard, go to **Site settings > Environment variables**.
    *   Add `GEMINI_API_KEY` with your Google Gemini API key.
5.  **Deploy**!

## Development

To run the project locally:

1.  Install dependencies:
    ```bash
    npm install
    ```
2.  Create a `.env` file with your `GEMINI_API_KEY`.
3.  Start the development server:
    ```bash
    npm run dev
    ```
