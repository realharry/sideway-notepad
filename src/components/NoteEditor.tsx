import React, { useState, useEffect, useRef } from 'react';
import { Note } from '../types/note';

interface NoteEditorProps {
  note: Note | null;
  onSave: (title: string, content: string) => void;
  onCancel: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    } else {
      setTitle('');
      setContent('');
    }
    
    // Focus on title input when editor opens
    setTimeout(() => {
      titleInputRef.current?.focus();
    }, 0);
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() && !content.trim()) {
      alert('Please enter a title or content for your note.');
      return;
    }

    onSave(title, content);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      // Ctrl+Enter or Cmd+Enter to save
      handleSubmit(e);
    }
  };

  return (
    <div className="note-editor" onKeyDown={handleKeyDown}>
      <form onSubmit={handleSubmit}>
        <div className="editor-header">
          <input
            ref={titleInputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note title..."
            className="title-input"
            maxLength={200}
          />
        </div>

        <div className="editor-body">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note here..."
            className="content-textarea"
            rows={15}
          />
        </div>

        <div className="editor-footer">
          <div className="editor-actions">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {note ? 'Update Note' : 'Save Note'}
            </button>
          </div>
          <div className="editor-help">
            <small>
              Press Ctrl+Enter to save • Esc to cancel
            </small>
          </div>
        </div>
      </form>
    </div>
  );
};