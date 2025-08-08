# EduMarket - Online Educational Marketplace

This is a modern, responsive frontend for an online educational marketplace, built with Next.js, React, and Tailwind CSS. It features:

-   **Landing Page**: Engaging hero section, featured courses, categories, testimonials, and a call-to-action.
-   **Course Listing Page**: Browse and filter courses by search query, category, level, price range, and sort by various criteria.
-   **Course Detail Page**: Detailed view of a single course.
-   **User Authentication**: Sign In and Sign Up pages.
-   **Instructor Dashboard**: A placeholder for future instructor functionalities.
-   **Wallet Integration**: Connects with MetaMask, WalletConnect, and Phantom.
-   **About Page**: Information about the platform.

## Getting Started

1.  **Clone the repository:**
    \`\`\`bash
    git clone <repository-url>
    cd educational-marketplace-frontend
    \`\`\`
2.  **Install dependencies:**
    \`\`\`bash
    npm install
    # or
    pnpm install
    # or
    yarn install
    \`\`\`
3.  **Run the development server:**
    \`\`\`bash
    npm run dev
    # or
    pnpm dev
    # or
    yarn dev
    \`\`\`
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `app/`: Next.js App Router pages and layouts.
-   `components/`: Reusable React components, including Shadcn UI components and custom components like `WalletButton`.
-   `lib/`: Utility functions, such as `wallet.ts` for Web3 interactions and `utils.ts` for general utilities.
-   `hooks/`: Custom React hooks, like `useWallet.ts`.
-   `public/`: Static assets like images.
-   `styles/`: Global CSS.

## Technologies Used

-   [Next.js](https://nextjs.org/)
-   [React](https://react.dev/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Shadcn UI](https://ui.shadcn.com/)
-   [Lucide React](https://lucide.dev/icons/) for icons
-   [Geist Fonts](https://vercel.com/font)
-   [Ethers.js](https://docs.ethers.org/v6/) for Ethereum interactions
