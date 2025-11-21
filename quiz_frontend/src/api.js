import React from 'react';
//
// Lightweight API client for the quiz backend
//
// Uses REACT_APP_API_BASE if provided; otherwise defaults to http://localhost:3001.
// All methods return parsed JSON and throw on non-OK responses with details.
//
// PUBLIC_INTERFACE
export const apiBase = (() => {
  // Prefer explicit environment variable when set
  const fromEnv = process.env.REACT_APP_API_BASE && process.env.REACT_APP_API_BASE.trim();
  if (fromEnv) return fromEnv;

  // Default to localhost:3001 as requested
  return "http://localhost:3001";
})();

/**
 * Internal helper to perform fetch requests with JSON handling.
 * Throws a detailed Error on non-2xx responses.
 */
async function request(path, options = {}) {
  const url = `${apiBase}${path}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  let response;
  try {
    response = await fetch(url, { ...options, headers });
  } catch (networkErr) {
    const error = new Error(`Network error while calling ${url}: ${networkErr.message}`);
    error.cause = networkErr;
    error.url = url;
    throw error;
  }

  // Attempt to parse JSON body whether ok or not
  let data = null;
  const contentType = response.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      data = await response.json();
    } catch (parseErr) {
      // keep data as null if cannot parse
    }
  } else {
    // fallback to text if not json
    try {
      const text = await response.text();
      data = text ? { message: text } : null;
    } catch {
      // ignore
    }
  }

  if (!response.ok) {
    const details = typeof data === 'object' && data !== null ? JSON.stringify(data) : String(data || '');
    const error = new Error(`Request failed ${response.status} ${response.statusText} for ${url}${details ? `: ${details}` : ''}`);
    error.status = response.status;
    error.url = url;
    error.response = data;
    throw error;
  }

  return data;
}

// PUBLIC_INTERFACE
export async function postNotes(text, title = null) {
  /**
   * Submit raw study notes and optional title to generate a quiz.
   * Backend: POST /notes
   * Body: { notes: string, title?: string | null }
   * Returns: QuizOut
   */
  if (!text || !text.trim()) {
    throw new Error('Notes text is required');
  }
  return request('/notes', {
    method: 'POST',
    body: JSON.stringify({ notes: text, title })
  });
}

// PUBLIC_INTERFACE
export async function listQuizzes() {
  /**
   * Retrieve a list of quiz metadata.
   * Backend: GET /quizzes
   * Returns: QuizMetaOut[]
   */
  return request('/quizzes', { method: 'GET' });
}

// PUBLIC_INTERFACE
export async function getQuiz(id) {
  /**
   * Retrieve a specific quiz by id.
   * Backend: GET /quizzes/{quiz_id}
   * Returns: QuizOut
   */
  if (!id) {
    throw new Error('getQuiz requires an id');
  }
  return request(`/quizzes/${encodeURIComponent(id)}`, { method: 'GET' });
}

/**
 * Convenience React hook for loading data with async function.
 * Not exported as PUBLIC_INTERFACE to keep main surface minimal.
 */
export function useAsync(asyncFn, deps = []) {
  const [state, setState] = React.useState({ loading: true, error: null, data: null });

  React.useEffect(() => {
    let cancelled = false;
    setState({ loading: true, error: null, data: null });
    asyncFn()
      .then((data) => {
        if (!cancelled) setState({ loading: false, error: null, data });
      })
      .catch((err) => {
        if (!cancelled) setState({ loading: false, error: err, data: null });
      });
    return () => {
      cancelled = true;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}
