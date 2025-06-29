# IdeaForge Local – Ascension Edition

IdeaForge Local is a privacy-first, local-only ideation and project management tool for creative professionals, founders, and teams. Capture, organize, and refine your app ideas, startup concepts, or product blueprints in a beautiful, tactile interface—entirely on your device. No accounts, no cloud, no data leaves your machine.

## Key Features

- **Local-First & Private:** All data is stored securely in your browser’s `localStorage`. Your ideas never leave your device.
- **Project & Idea Management:** Organize your thoughts into projects (“Constellations”) and detailed ideas (“Blueprints”).
- **Rich Editing & Attachments:** Add formatted notes, images, and files to your ideas and projects.
- **Undo/Redo for All Changes:** Instantly undo or redo any project or idea modification, including deletions, edits, and reordering.
- **Drag-and-Drop & Reordering:** Intuitive drag-and-drop for organizing ideas and projects (coming soon).
- **Advanced Export & Sharing:** Export projects as PDFs, ZIPs, or shareable links. Full JSON backup and restore supported.
- **AI Augmentation (Optional):** Generate boilerplate content and summaries for your ideas using Google Gemini (API key required).
- **Customizable Interface:** Multiple themes, accent color selection, font scaling, high-contrast and reduced motion modes, and list density options.
- **Accessibility:** ARIA labels, keyboard navigation, color contrast improvements, and screen reader support.
- **Offline-Ready:** Works fully offline; all features available without an internet connection.
- **Performance Optimized:** Code-splitting, lazy loading, and bundle optimization for fast load times.
- **Responsive & Mobile-Friendly:** Adapts seamlessly to all device sizes.

## Getting Started

### Prerequisites
- **Node.js** v18.x or later
- **npm** v9.x or later (or `yarn`/`pnpm`)

### Installation
1. **Clone the Repository:**
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Set Up Environment Variables (Optional for AI):**
   Create a `.env` file in the project root:
   ```env
   API_KEY=YOUR_GEMINI_API_KEY
   ```
   Get your Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey). This is only required for AI features.
4. **Run the Development Server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   The app will be available at `http://localhost:3000` by default.

## Project Structure
- `components/` – Reusable UI components
- `services/` – Business logic and data services
- `styles/` – Theme and global style definitions
- `motion/` – Animation variants (Framer Motion)
- `hooks/` – Custom React hooks
- `types/` – TypeScript type definitions
- `utils/` – Utility functions (e.g., export helpers)
- `rendering/` – Advanced rendering (e.g., `CosmicCanvas`)
- `__mocks__/` – Jest test mocks
- Configuration: `jest.config.cjs`, `tsconfig.json`, `vite.config.ts`, etc.

## Development Workflow
- **Start Dev Server:** `npm run dev`
- **Build for Production:** `npm run build`
- **Lint:** `npm run lint`
- **Format:** `npm run format`
- **Test:** `npm test`
- **Test with Coverage:** `npm test -- --coverage`

## Continuous Integration
A GitHub Actions workflow (`.github/workflows/ci.yml`) runs linting, formatting, and tests on every push to ensure code quality.

## Contributing
Contributions are welcome! Please open an issue or pull request with your suggestions or improvements. See `CONTRIBUTING.md` for guidelines (if available).

## License
This project is licensed under the [MIT](LICENSE) license.

---

**IdeaForge Local** empowers you to ideate, organize, and export your creative visions—privately and efficiently. Happy forging!
