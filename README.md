# Todo Application

A modern, feature-rich Todo Application built with React, TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- ✨ **Section Management**: Organize todos into custom sections (categories)
- ➕ **Add Sections**: Create new sections to categorize your tasks
- 🗑️ **Delete Sections**: Remove sections along with their todos
- ✅ **Todo Management**: Full CRUD operations for todos
  - Add new todos to any section
  - Edit existing todos inline
  - Mark todos as complete/incomplete
  - Delete todos
- 🎨 **Beautiful UI**: Clean, modern interface using shadcn/ui components
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality component library
- **Lucide React** - Beautiful icons

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/akash-kd/todo-app.git
cd todo-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Usage

1. **Add a Section**: Enter a section name in the top input field and click "Add Section"
2. **Add a Todo**: Within any section, type your todo in the input field and press Enter or click the + button
3. **Edit a Todo**: Click the edit (pencil) icon next to any todo, modify the text, and press Enter or click the checkmark
4. **Complete a Todo**: Click the checkbox next to any todo to mark it as complete
5. **Delete a Todo**: Click the trash icon next to any todo to remove it
6. **Delete a Section**: Click the trash icon in the section header to remove the entire section and all its todos

## Project Structure

```
todo-app/
├── src/
│   ├── components/
│   │   └── ui/           # shadcn/ui components
│   ├── lib/
│   │   └── utils.ts      # Utility functions
│   ├── App.tsx           # Main application component
│   ├── types.ts          # TypeScript type definitions
│   ├── index.css         # Global styles and Tailwind imports
│   └── main.tsx          # Application entry point
├── public/               # Static assets
└── package.json          # Project dependencies
```

## Screenshots

### Initial View
![Todo Application](https://github.com/user-attachments/assets/a6d3662e-0850-4865-b5fa-686e2e3b9976)

### With Multiple Sections and Completed Todos
![Todo Application with Sections](https://github.com/user-attachments/assets/c315a5c1-c740-4c40-b3fa-333a742cab14)

## License

MIT

