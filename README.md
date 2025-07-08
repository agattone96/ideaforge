

# IdeaForge Local

IdeaForge is your private brainstorming sandbox designed to capture, structure, and explore your brilliant app ideas, startup concepts, or project inspirations. All data stays on your device, ensuring complete privacy and control. No accounts, no cloud, just your ideas.

## Features

*   **Local-First & Private:** All data is stored in your browser's `localStorage`.
*   **Project & Idea Management:** Organize your thoughts into Projects and detailed Ideas.
*   **Rich Text Editing:** Format your ideas with notes and inspiration.
*   **File Attachments:** Add images, text files, and ZIP archives to your ideas and projects.
*   **Interactive Idea Cards:** Ideas are represented as 3D, flippable cards that reveal a quick summary on the back.
*   **Export to PDF Report:** Create visual PDF exports of your project boards or individual ideas.
*   **AI Augmentation (Optional):**
    *   Generate boilerplate content for new ideas (problem, solution, features, audience).
    *   Summarize existing idea notes.
    *   (Requires a Google Gemini API Key)
*   **Data Export & Backup:** Export individual ideas (Markdown + attachments), entire projects as ZIP archives, or create a full JSON backup for restoration.
*   **Customizable Interface:**
    *   Choose from multiple themes (Dark, Light, Cosmic).
    *   Adjust accent colors and typography size.
    *   Toggle high-contrast and reduced motion modes.
    *   Switch between list densities.
*   **Responsive Design:** Adapts to various screen sizes.
*   **Keyboard Shortcuts:** For efficient navigation and actions.
*   **Immersive Theming:** A cohesive aesthetic with custom animations, icons, and themes.

## Prerequisites

Before you begin, ensure you have the following installed:

*   **Node.js**: Version 18.x or later recommended. (Check with `node -v`)
*   **npm**: Version 9.x or later recommended (usually comes with Node.js). (Check with `npm -v`)
    *   Alternatively, you can use `yarn` or `pnpm`.

## Installation and Setup

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install Dependencies:**
    Using npm:
    ```bash
    npm install
    ```
    If the `run_in_bash_session` tool fails due to the large number of files created
    by `npm install`, you can install packages into a temporary directory and
    symlink `node_modules` back into the repository:

    ```bash
    scripts/setup-temp-node-modules.sh
    ```
    Or using yarn:
    ```bash
    yarn install
    ```

3.  **Set Up Environment Variables:**
    The application uses `process.env.API_KEY` for the optional Gemini features. For local development with Vite, you must create an environment file to store your secret key.

    Create a file named `.env` in the root of the project directory and add your API key:

    ```env
    # .env
    API_KEY=YOUR_GEMINI_API_KEY
    ```
    
    The `vite.config.ts` file is configured to load this variable and make it accessible to the application code as `process.env.API_KEY`. This file is listed in `.gitignore` and should not be committed to version control.

    Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

4.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    Or using yarn:
    ```bash
    yarn dev
    ```
    This will typically start the application on `http://localhost:3000`.

## Project Structure Overview

A brief overview of key directories:

*   **`public/`**: Contains static assets that are copied directly to the build output.
    *   **`assets/`**: The primary folder for static assets like images (`cosmic-forge-logo-transparent.png`, `nebula-bg.jpg`).
*   **`src/`** (or root for some files like `index.tsx`): Contains the main application source code.
    *   **`components/`**: Reusable UI components.
    *   **`services/`**: Modules for business logic and API interactions (e.g., `projectService.ts`, `aiService.ts`).
    *   **`styles/`**: Global styles, theme definitions (`theme.ts`).
    *   **`motion/`**: Animation variants and transitions for Framer Motion.
    *   **`hooks/`**: Custom React hooks.
    *   **`types/`**: TypeScript type definitions.
    *   **`utils/`**: Utility functions like the `zineExporter`.
    *   **`rendering/`**: Components or modules related to advanced rendering, like `CosmicCanvas.tsx`.
*   **`__mocks__/`**: Directory for Jest mocks.
*   **Configuration Files**: `jest.config.js`, `jest.setup.ts`, `.eslintrc.js`, `.prettierrc.js`, `tsconfig.json`, `vite.config.ts`, etc.

## Development Workflow

The following scripts are available for development:

*   **Run Development Server:**
    ```bash
    npm run dev
    ```
    Starts the application in development mode with hot reloading.

*   **Build for Production:**
    ```bash
    npm run build
    ```
    Bundles the application for production deployment into a `dist` folder.

*   **Lint Code:**
    ```bash
    npm run lint
    ```
    Checks the codebase for linting errors using ESLint.

*   **Check Formatting:**
    ```bash
    npm run format:check
    ```
    Checks code formatting using Prettier without making changes.

*   **Format Code:**
    ```bash
    npm run format
    ```
    Automatically formats code using Prettier.

*   **Run Tests:**
    ```bash
    npm test
    ```
    Runs unit and integration tests using Jest and React Testing Library.

*   **Run Tests with Coverage:**
    ```bash
    npm test -- --coverage
    ```
    Runs tests and generates a code coverage report.

## CI Pipeline

The project includes a GitHub Actions CI pipeline defined in `.github/workflows/ci.yml`. This pipeline automatically runs on every push to the repository and performs the following checks:

1.  **Code Linting:** Runs `npm run lint`.
2.  **Code Formatting Check:** Runs `npm run format:check`.
3.  **Tests & Coverage:** Runs `npm test -- --coverage`.

The build will fail if any of these checks do not pass, ensuring code quality and adherence to project standards.

## Contributing

(Details on how to contribute to the project, coding standards, pull request process, etc., can be added here.)

## License

(Specify the license for the project, e.g., MIT, Apache 2.0.)

---

Happy Ideating!