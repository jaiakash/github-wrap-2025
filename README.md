# GitHub Wrap 2025

**Your year in code, unwrapped. 🎁**

GitHub Wrap 2025 is a Next.js application that visualizes your GitHub contributions, top languages, and fun facts for the year. Inspired by Spotify Wrapped, it generates a personalized summary of your year in open source.

## About

This project connects to the GitHub API to fetch user data and presents it in a beautiful, shareable format. It's designed to celebrate the hard work of developers by highlighting their achievements, from total contributions to their most loved languages.

## Features

- **Yearly Overview**: See your total contributions, pull requests, and issues for the year at a glance.
- **Top Languages**: Visualize your most-used programming languages with a sleek progress bar design.
- **Fun Facts**: Get a personalized "personality" assessment based on your coding habits (e.g., "Trendsetter", "Memory Safety Enthusiast").
- **Community Stats**: View your follower growth and the organizations you're part of.
- **Recent Stars**: A snapshot of repositories you've recently appreciated.
- **Shareable Card**: A beautifully designed "Wrap Card" that you can screenshot and share on social media.

## Technologies Used

- **Framework:** [Next.js 15+](https://nextjs.org) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** CSS Modules with organic shapes and glassmorphism effects.
- **Font:** [Geist](https://vercel.com/font)
- **Deployment:** Vercel

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

- **Node.js**: Ensure you have Node.js 18.17 or later installed.
- **Git**: You'll need Git to clone the repository.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/jaiakash/github-wrap-2025.git
    cd github-wrap-2025
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    # or
    bun install
    ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. The application usually runs at this address unless the port is occupied.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).

1.  Push your code to a GitHub repository.
2.  Import the project into Vercel.
3.  Vercel will detect Next.js and configure the build settings automatically.
4.  Click **Deploy**.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
