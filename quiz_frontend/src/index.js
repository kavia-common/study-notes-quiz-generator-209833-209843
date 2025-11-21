import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UploadNotes from './pages/UploadNotes';
import QuizList from './pages/QuizList';
import QuizDetail from './pages/QuizDetail';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App>
        <Routes>
          <Route path="/" element={<UploadNotes />} />
          <Route path="/quizzes" element={<QuizList />} />
          <Route path="/quizzes/:id" element={<QuizDetail />} />
        </Routes>
      </App>
    </BrowserRouter>
  </React.StrictMode>
);
