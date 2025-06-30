# IdeaForge Local: AI Development Rules

This document outlines the core technologies and best practices for developing features within the IdeaForge Local application.

## Tech Stack Overview

*   **React**: The primary JavaScript library for building the user interface.
*   **TypeScript**: Used for type safety across the entire codebase, enhancing maintainability and reducing bugs.
*   **Tailwind CSS**: The exclusive utility-first CSS framework for all styling.
*   **Framer Motion**: Utilized for all animations and transitions, providing smooth and engaging user experiences.
*   **Shadcn/ui**: A collection of re-usable components built with Radix UI and Tailwind CSS, providing a consistent and accessible UI foundation.
*   **Radix UI**: The low-level component library that powers Shadcn/ui, ensuring accessibility and robust behavior.
*   **React Router**: Manages client-side routing and navigation within the application.
*   **Google Gemini API (`@google/genai`)**: Powers the AI augmentation features, such as boilerplate generation and summarization.
*   **JSZip**: Used for client-side file compression (ZIP) and decompression.
*   **jspdf & html2canvas**: Libraries for generating PDF documents from HTML content.
*   **Jest & React Testing Library**: The chosen tools for unit and integration testing.

## Library Usage Rules

To maintain consistency, performance, and ease of development, please adhere to the following guidelines when implementing new features or modifying existing ones:

*   **UI Components**:
    *   **Prioritize Shadcn/ui**: Always check if a suitable component exists within the Shadcn/ui library first.
    *   **Custom Components**: If a Shadcn/ui component does not fit the requirements or needs significant customization, create a new, dedicated component file in `src/components/`.
*   **Styling**:
    *   **Tailwind CSS Only**: All styling must be done using Tailwind CSS utility classes. Avoid writing custom CSS in separate `.css` or `.scss` files, except for global styles in `src/index.css` if absolutely necessary.
*   **Animations**:
    *   **Framer Motion**: Use `framer-motion` for all animations, transitions, and gestures. Avoid other animation libraries or direct DOM manipulation for animations.
*   **State Management**:
    *   **React Hooks**: For local component state, use `useState` and `useReducer`.
    *   **Global State**: The `useUndoRedo` context is established for managing the application's project and idea data. Extend this context for any new global state related to projects/ideas.
*   **Routing**:
    *   **React Router**: Use `react-router-dom` for defining routes and navigating between different views/pages. Keep the main routing logic within `App.tsx`.
*   **Icons**:
    *   **Lucide React**: Prefer icons from the `lucide-react` library. If a required icon is not available, add a custom SVG component to `src/components/icons.tsx`.
*   **AI Integration**:
    *   **`@google/genai`**: All interactions with the Google Gemini API must use the `@google/genai` library, encapsulated within `src/services/localStorageService.ts` or a new dedicated AI service file.
*   **File Operations**:
    *   **`jszip`**: Use `jszip` for creating or extracting `.zip` archives.
    *   **`jspdf` & `html2canvas`**: Use these libraries for generating PDF exports of content.
*   **Testing**:
    *   **Jest & React Testing Library**: All new components and significant logic should be covered by tests using Jest and React Testing Library.