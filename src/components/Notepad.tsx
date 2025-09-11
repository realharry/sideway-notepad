import React, { useState, useEffect } from 'react';
import { Note } from '../types/note';
import { storageUtils } from '../utils/storage';
import { NoteEditor } from './NoteEditor';
import { NoteList } from './NoteList';
import './Notepad.css';

export const Notepad: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const loadedNotes = await storageUtils.getNotes();
      setNotes(loadedNotes);
    } catch (error) {
      console.error('Failed to load notes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = () => {
    setSelectedNote(null);
    setIsEditing(true);
  };

  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsEditing(true);
  };

  const handleSaveNote = async (title: string, content: string) => {
    try {
      let savedNote: Note;
      
      if (selectedNote) {
        // Update existing note
        const updated = await storageUtils.updateNote(selectedNote.id, title, content);
        if (updated) {
          savedNote = updated;
          setNotes(notes.map(n => n.id === updated.id ? updated : n));
        } else {
          throw new Error('Failed to update note');
        }
      } else {
        // Create new note
        savedNote = await storageUtils.addNote(title, content);
        setNotes([savedNote, ...notes]);
      }

      setSelectedNote(savedNote);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save note:', error);
      alert('Failed to save note. Please try again.');
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this note?')) {
      return;
    }

    try {
      const success = await storageUtils.deleteNote(noteId);
      if (success) {
        setNotes(notes.filter(n => n.id !== noteId));
        if (selectedNote && selectedNote.id === noteId) {
          setSelectedNote(null);
          setIsEditing(false);
        }
      }
    } catch (error) {
      console.error('Failed to delete note:', error);
      alert('Failed to delete note. Please try again.');
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    if (!selectedNote) {
      // If we were creating a new note, don't select anything
      setSelectedNote(null);
    }
  };

  if (loading) {
    return <div className="notepad loading">Loading...</div>;
  }

  return (
    <div className="notepad">
      <div className="notepad-header">
        <h1>Sideway Notepad</h1>
        <button 
          className="btn-primary"
          onClick={handleCreateNote}
          disabled={isEditing}
        >
          New Note
        </button>
      </div>

      <div className="notepad-content">
        <div className="notes-sidebar">
          <NoteList
            notes={notes}
            selectedNote={selectedNote}
            onSelectNote={setSelectedNote}
            onEditNote={handleEditNote}
            onDeleteNote={handleDeleteNote}
            disabled={isEditing}
          />
        </div>

        <div className="note-editor-area">
          {isEditing ? (
            <NoteEditor
              note={selectedNote}
              onSave={handleSaveNote}
              onCancel={handleCancelEdit}
            />
          ) : selectedNote ? (
            <div className="note-viewer">
              <h2>{selectedNote.title}</h2>
              <div className="note-meta">
                Created: {new Date(selectedNote.createdAt).toLocaleDateString()}
                {selectedNote.updatedAt.getTime() !== selectedNote.createdAt.getTime() && (
                  <span> | Updated: {new Date(selectedNote.updatedAt).toLocaleDateString()}</span>
                )}
              </div>
              <div className="note-content">
                {selectedNote.content.split('\n').map((line, i) => (
                  <p key={i}>{line || '\u00A0'}</p>
                ))}
              </div>
              <button className="btn-secondary" onClick={() => handleEditNote(selectedNote)}>
                Edit Note
              </button>
            </div>
          ) : (
            <div className="empty-state">
              <h2>Welcome to Sideway Notepad</h2>
              <p>Select a note from the sidebar or create a new one to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};