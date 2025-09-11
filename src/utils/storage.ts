import { Note } from '../types/note';

const STORAGE_KEY = 'sideway_notepad_notes';

export const storageUtils = {
  async getNotes(): Promise<Note[]> {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        const result = await chrome.storage.local.get(STORAGE_KEY);
        const notes = result[STORAGE_KEY] || [];
        // Convert date strings back to Date objects
        return notes.map((note: any) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt)
        }));
      } else {
        // Fallback to localStorage for development
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const notes = JSON.parse(stored);
          // Convert date strings back to Date objects
          return notes.map((note: any) => ({
            ...note,
            createdAt: new Date(note.createdAt),
            updatedAt: new Date(note.updatedAt)
          }));
        }
        return [];
      }
    } catch (error) {
      console.error('Error loading notes:', error);
      return [];
    }
  },

  async saveNotes(notes: Note[]): Promise<void> {
    try {
      if (typeof chrome !== 'undefined' && chrome.storage) {
        await chrome.storage.local.set({ [STORAGE_KEY]: notes });
      } else {
        // Fallback to localStorage for development
        localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      }
    } catch (error) {
      console.error('Error saving notes:', error);
      throw error;
    }
  },

  async addNote(title: string, content: string): Promise<Note> {
    const note: Note = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      title: title.trim() || 'Untitled Note',
      content: content.trim(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const notes = await this.getNotes();
    notes.unshift(note); // Add to beginning of array
    await this.saveNotes(notes);
    return note;
  },

  async updateNote(id: string, title: string, content: string): Promise<Note | null> {
    const notes = await this.getNotes();
    const noteIndex = notes.findIndex(n => n.id === id);
    
    if (noteIndex === -1) return null;

    notes[noteIndex] = {
      ...notes[noteIndex],
      title: title.trim() || 'Untitled Note',
      content: content.trim(),
      updatedAt: new Date(),
    };

    await this.saveNotes(notes);
    return notes[noteIndex];
  },

  async deleteNote(id: string): Promise<boolean> {
    const notes = await this.getNotes();
    const filteredNotes = notes.filter(n => n.id !== id);
    
    if (filteredNotes.length === notes.length) {
      return false; // Note not found
    }

    await this.saveNotes(filteredNotes);
    return true;
  }
};