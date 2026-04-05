# AI Development Rules - Chess Insight

## Tech Stack
- **React 18 (Vite):** Core frontend framework for building a fast, modern SPA.
- **TypeScript:** Strictly typed codebase for reliability and maintainability.
- **Tailwind CSS:** Utility-first styling for rapid, responsive UI development.
- **shadcn/ui:** Accessible, high-quality UI components built on Radix UI primitives.
- **React Router DOM:** Client-side routing for seamless navigation between dashboard, predictions, and analytics.
- **Recharts:** Primary library for all data visualizations, including rating distributions and win rates.
- **Framer Motion:** Used for smooth page transitions, interactive elements, and micro-animations.
- **Lucide React:** Standardized icon set for consistent visual language.
- **TanStack Query (v5):** State management for data fetching, caching, and synchronization.
- **Zod & React Hook Form:** Robust schema-based validation and form handling.

## Library Usage Rules
- **UI Components:** Always prioritize using existing components in `src/components/ui/`. If a new component is needed, create a small, focused file in `src/components/`.
- **Styling:** Use Tailwind CSS classes exclusively. Avoid custom CSS files or inline styles unless calculating dynamic values.
- **Icons:** Use `lucide-react` for all iconography.
- **Data Visualization:** Use `recharts`. Ensure charts follow the "Chess Gold" theme (Gold: `hsl(45, 80%, 65%)`, Amber: `hsl(38, 90%, 55%)`).
- **Animations:** Use `framer-motion` for any non-trivial transitions. Keep animations subtle and performant.
- **State Management:** Use TanStack Query for server-side data. Use React `useState` or `useContext` for local UI state.
- **Forms:** Implement all forms using `react-hook-form` with `zod` for validation.
- **Notifications:** Use the `sonner` or `toast` components for user feedback on actions.
- **File Structure:** Keep components under 100 lines. Refactor into smaller sub-components if they grow too large.