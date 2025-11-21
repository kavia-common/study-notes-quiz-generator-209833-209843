import React from 'react';
import { Link } from 'react-router-dom';
import { listQuizzes, useAsync } from '../api';

// PUBLIC_INTERFACE
export default function QuizList() {
  /**
   * Lists generated quizzes with navigation to details.
   */
  const { loading, error, data } = useAsync(listQuizzes, []);

  return (
    <div className="container" style={{ maxWidth: 960, margin: '0 auto' }}>
      <h1 className="title">Quizzes</h1>
      {loading && <p className="description">Loading...</p>}
      {error && <p role="alert" style={{ color: '#EF4444' }}>{error.message || 'Failed to load quizzes'}</p>}
      {!loading && !error && (
        <>
          {Array.isArray(data) && data.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
              {data.map((q) => (
                <li key={q.id} style={{ border: '1px solid var(--border-color)', borderRadius: 10, padding: 12, background: 'var(--bg-secondary)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <div>
                      <div style={{ fontWeight: 700 }}>{q.title}</div>
                      <div style={{ fontSize: 12, opacity: 0.8 }}>
                        {q.question_count} questions · Created {q.created_at}
                      </div>
                    </div>
                    <Link to={`/quizzes/${encodeURIComponent(q.id)}`} style={{ textDecoration: 'none' }}>
                      <button
                        className="btn"
                        style={{
                          backgroundColor: 'var(--button-bg)',
                          color: 'var(--button-text)',
                          border: 'none',
                          padding: '8px 14px',
                          borderRadius: 8,
                          cursor: 'pointer',
                          fontWeight: 700
                        }}
                      >
                        View
                      </button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="description">No quizzes yet. Try generating one from the Upload page.</p>
          )}
        </>
      )}
    </div>
  );
}
