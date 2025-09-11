# Sideway Notepad

A clean and minimalistic notepad Chrome extension built with TypeScript, React, and Vite. Take notes in a sidepanel or use it as your new tab page.

## Features

- 📝 **Clean Interface**: Minimalistic design focused on writing
- 🔄 **Sidepanel Integration**: Opens in Chrome's sidepanel, not a popup
- 🏠 **New Tab Override**: Replace your new tab page with the notepad
- 💾 **Local Storage**: Notes are saved in browser's local storage
- ✏️ **Full CRUD**: Create, read, update, and delete notes
- 🎨 **Modern Stack**: Built with TypeScript, React, and Vite

## Screenshots

### Initial View
![Initial View](https://github.com/user-attachments/assets/20e50bdf-c097-433a-9bb9-c03e6b7cf38b)

### Note Editor
![Note Editor](https://github.com/user-attachments/assets/30ebd3a8-ab4f-41e5-9c92-8bb8d31b77dd)

### Multiple Notes
![Multiple Notes](https://github.com/user-attachments/assets/c5c7c222-f4b5-4198-a55b-9874f6aded71)

## Installation

### For Development

1. Clone the repository:
   ```bash
   git clone https://github.com/realharry/sideway-notepad.git
   cd sideway-notepad
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the extension:
   ```bash
   npm run build
   ```

4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" in the top right
   - Click "Load unpacked" and select the `dist` folder

### For Users

1. Download the latest release from the releases page
2. Unzip the file
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" in the top right
5. Click "Load unpacked" and select the unzipped folder

## Usage

- **Sidepanel**: Click the extension icon in the toolbar to open the notepad in the sidepanel
- **New Tab**: Open a new tab to see the notepad interface
- **Create Note**: Click "New Note" to create a new note
- **Edit Note**: Click the edit button (✏️) or "Edit Note" to modify existing notes
- **Delete Note**: Click the delete button (🗑️) to remove notes
- **Keyboard Shortcuts**: 
  - `Ctrl+Enter` (or `Cmd+Enter`) to save while editing
  - `Esc` to cancel editing

## Technical Details

- **Framework**: React with TypeScript
- **Build Tool**: Vite
- **Chrome Extension**: Manifest v3
- **Storage**: Chrome Storage API with localStorage fallback
- **Styling**: Custom CSS with clean, minimal design

## Development

### Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Project Structure

```
src/
├── components/
│   ├── Notepad.tsx      # Main notepad component
│   ├── NoteEditor.tsx   # Note editing interface
│   ├── NoteList.tsx     # List of notes
│   ├── NoteItem.tsx     # Individual note display
│   └── Notepad.css      # Component styles
├── utils/
│   └── storage.ts       # Storage utilities
├── types/
│   └── note.ts          # TypeScript types
├── background.ts        # Service worker
├── sidepanel.tsx        # Sidepanel entry point
├── newtab.tsx          # New tab entry point
└── index.css           # Global styles
```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details. 
