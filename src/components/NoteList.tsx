import React from 'react';
import { Note } from '../types/note';
import { NoteItem } from './NoteItem';

interface NoteListProps {
  notes: Note[];
  selectedNote: Note | null;
  onSelectNote: (note: Note) => void;
  onEditNote: (note: Note) => void;
  onDeleteNote: (noteId: string) => void;
  disabled?: boolean;
}

export const NoteList: React.FC<NoteListProps> = ({
  notes,
  selectedNote,
  onSelectNote,
  onEditNote,
  onDeleteNote,
  disabled = false
}) => {
  if (notes.length === 0) {
    return (
      <div className="note-list empty">
        <p>No notes yet. Create your first note!</p>
      </div>
    );
  }

  return (
    <div className="note-list">
      <div className="note-list-header">
        <h3>Notes ({notes.length})</h3>
      </div>
      <div className="note-list-items">
        {notes.map((note) => (
          <NoteItem
            key={note.id}
            note={note}
            isSelected={selectedNote?.id === note.id}
            onClick={() => onSelectNote(note)}
            onEdit={() => onEditNote(note)}
            onDelete={() => onDeleteNote(note.id)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
};