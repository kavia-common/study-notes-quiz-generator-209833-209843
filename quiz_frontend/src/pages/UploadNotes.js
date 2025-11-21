import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postNotes } from '../api';

// PUBLIC_INTERFACE
export default function UploadNotes() {
  /**
   * Notes upload and quiz generation form.
   * On success, navigates to /quizzes/:id with the newly created quiz id.
   */
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const canSubmit = notes.trim().length > 0 && !submitting;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);
    try {
      const quiz = await postNotes(notes, title.trim() ? title.trim() : null);
      // Expecting QuizOut with field 'id'
      if (quiz && quiz.id) {
        navigate(`/quizzes/${encodeURIComponent(quiz.id)}`);
      } else {
        throw new Error('Unexpected response format: missing quiz id');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit notes');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
      <h1 className="title">Upload Study Notes</h1>
      <p className="description">Paste your study notes to generate a multiple-choice quiz.</p>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12 }}>
        <label>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Title (optional)</div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ex: Chapter 3 - Cell Biology"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              boxSizing: 'border-box'
            }}
          />
        </label>

        <label>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>Notes</div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Paste or type your study notes here..."
            rows={10}
            required
            style={{
              width: '100%',
              padding: 12,
              borderRadius: 8,
              border: '1px solid var(--border-color)',
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              resize: 'vertical',
              boxSizing: 'border-box'
            }}
          />
        </label>

        {error && (
          <div role="alert" style={{ color: 'var(--text-primary)', background: '#EF444422', border: '1px solid #EF4444', padding: 8, borderRadius: 8 }}>
            {error}
          </div>
        )}

        <div>
          <button
            type="submit"
            disabled={!canSubmit}
            className="btn"
            style={{
              backgroundColor: 'var(--button-bg)',
              color: 'var(--button-text)',
              border: 'none',
              padding: '10px 16px',
              borderRadius: 8,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              opacity: canSubmit ? 1 : 0.6,
              fontWeight: 700
            }}
          >
            {submitting ? 'Generating...' : 'Generate Quiz'}
          </button>
        </div>
      </form>
    </div>
  );
}
