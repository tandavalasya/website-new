import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { Resume } from './pages/Resume';

/**
 * Main App component
 * 
 * Sets up routing and error boundaries
 * Currently focused on Resume page as priority
 * 
 * Future routes:
 * - / (Home)
 * - /about
 * - /events
 * - /blog
 * - /contact
 * - /curriculum
 */
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
          <Routes>
            {/* Resume page as default for now */}
            <Route path="/" element={<Navigate to="/resume" replace />} />
            <Route path="/resume" element={<Resume />} />

            {/* Placeholder for future routes */}
            <Route path="*" element={<Navigate to="/resume" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
