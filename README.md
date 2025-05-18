# Skips Selector

A multi-step skip-hire booking UI built with Vite, React and TailwindCSS.  
It walks the user through:

1. Entering postcode
2. Choosing waste type
3. Selecting a skip (with live filtering & sorting)
4. Permit check
5. Date selection
6. Payment

## Features

-   **Wizard/Stepper** — clickable steps, responsive collapse to 3-item or 2-item views on narrow screens, and a 250 px radial progress view.
-   **Sticky header & footer** — stepper stays pinned at top, Next/Back nav at bottom, only main content scrolls.
-   **Skip selection**
    -   Fetches skip data via `useSkips()`, shows a loading spinner while loading.
    -   Responsive grid (1–3 columns).
    -   Filter by yard size & price range using dual-thumb sliders.
    -   Toggles for “road legal” & “heavy waste” allowed.
    -   Sort buttons for size ↑↓ and price ↑↓.
    -   Click a skip card to select/unselect it (only one at a time), Next button enables only after selection.
-   **Reusable components** — `Stepper`, `FilterBar`, `SkipCard`, `NavigationButtons`, etc.

## Tech Stack

-   **Vite** + React 18
-   **TailwindCSS** for utility-first styling
-   **Heroicons** for vector icons
-   **react-range** for dual-thumb sliders
-   Fetch API (no external state library)

## Getting Started

### Prerequisites

-   Node.js v16+
-   npm or yarn

### Installation

```bash
# clone the repo
git clone https://github.com/nedkrs/skips.git
cd skips

# install dependencies
npm install
# or
yarn
```
