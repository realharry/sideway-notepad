import React from 'react';
import { Note } from '../types/note';

interface NoteItemProps {
  note: Note;
  isSelected: boolean;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
  disabled?: boolean;
}

export const NoteItem: React.FC<NoteItemProps> = ({
  note,
  isSelected,
  onClick,
  onEdit,
  onDelete,
  disabled = false
}) => {
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      onEdit();
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!disabled) {
      onDelete();
    }
  };

  const truncateContent = (content: string, maxLength: number = 100) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  return (
    <div
      className={`note-item ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={disabled ? undefined : onClick}
    >
      <div className="note-item-header">
        <h4 className="note-title">{note.title}</h4>
        <div className="note-actions">
          <button
            className="action-btn edit-btn"
            onClick={handleEdit}
            disabled={disabled}
            title="Edit note"
          >
            ✏️
          </button>
          <button
            className="action-btn delete-btn"
            onClick={handleDelete}
            disabled={disabled}
            title="Delete note"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div className="note-preview">
        {truncateContent(note.content)}
      </div>
      
      <div className="note-meta">
        <small>
          {new Date(note.updatedAt).toLocaleDateString()}
        </small>
      </div>
    </div>
  );
};