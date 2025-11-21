import React from 'react';
import { useParams } from 'react-router-dom';

// PUBLIC_INTERFACE
export default function QuizDetail() {
  /** Placeholder for quiz details view for a given quiz id. */
  const { id } = useParams();
  return (
    <div className="container">
      <h1 className="title">Quiz Details</h1>
      <p className="description">Viewing quiz with id: <strong>{id}</strong> (Placeholder)</p>
    </div>
  );
}
