// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddBookPage from './pages/AddBookPage';
import BookDetailPage from './pages/BookDetailPage';
import EditBookPage from './pages/EditBookPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail/:id" element={<BookDetailPage />} />
        <Route path="/add" element={<AddBookPage />} />
        <Route path="/edit/:id" element={<EditBookPage />} />
      </Routes>
    </Router>
  );
}

export default App;
