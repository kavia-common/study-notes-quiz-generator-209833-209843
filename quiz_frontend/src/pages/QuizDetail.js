import React from 'react';
import { useParams } from 'react-router-dom';
import { getQuiz, useAsync } from '../api';

// PUBLIC_INTERFACE
export default function QuizDetail() {
  /**
   * Quiz details view for a given quiz id.
   */
  const { id } = useParams();
  const { loading, error, data } = useAsync(() => getQuiz(id), [id]);

  return (
    <div className="container" style={{ maxWidth: 960, margin: '0 auto' }}>
      <h1 className="title">Quiz Details</h1>
      {loading && <p className="description">Loading quiz...</p>}
      {error && <p role="alert" style={{ color: '#EF4444' }}>{error.message || 'Failed to load quiz'}</p>}
      {!loading && !error && data && (
        <>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{data.title}</div>
            <div style={{ fontSize: 12, opacity: 0.8 }}>Created {data.created_at}</div>
            <div style={{ fontSize: 12, opacity: 0.6 }}>Source Hash: {data.source_notes_hash}</div>
          </div>

          <ol style={{ paddingLeft: 18, display: 'grid', gap: 12 }}>
            {data.questions.map((q) => (
              <li key={q.id} style={{ border: '1px solid var(--border-color)', borderRadius: 10, padding: 12, background: 'var(--bg-secondary)' }}>
                <div style={{ fontWeight: 700, marginBottom: 8 }}>{q.question}</div>
                <ul style={{ listStyle: 'none', paddingLeft: 0, display: 'grid', gap: 6 }}>
                  {q.options.map((opt, idx) => {
                    const isCorrect = idx === q.correct_index;
                    return (
                      <li key={idx} style={{
                        padding: '6px 8px',
                        borderRadius: 6,
                        border: '1px solid var(--border-color)',
                        background: isCorrect ? '#10B98122' : 'transparent'
                      }}>
                        {opt} {isCorrect ? '✅' : ''}
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ol>
        </>
      )}
    </div>
  );
}
