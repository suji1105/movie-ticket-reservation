import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import MoviesPage from './pages/MoviesPage';
import StreamPage from './pages/StreamPage';
import TheatresPage from './pages/TheatresPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import HelplinePage from './pages/HelplinePage';
import ExperiencePage from './pages/ExperiencePage';
import MovieDetailPage from './pages/MovieDetailPage';
import ShowtimesPage from './pages/ShowtimesPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import PaymentPage from './pages/PaymentPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { CityProvider } from './contexts/CityContext';
import Header from './components/Header';
import Footer from './components/Footer';
import './index.css';

// Wrapper to hide Header on auth pages
function HeaderWrapper() {
  const location = useLocation();
  if (location.pathname === '/login' || location.pathname === '/signup') {
    return null;
  }
  return <Header />;
}

function App() {
  return (
    <CityProvider>
      <Router>
        <HeaderWrapper />
        <main style={{ paddingTop: '80px', minHeight: '80vh' }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/stream" element={<StreamPage />} />
            <Route path="/theatres" element={<TheatresPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/helpline" element={<HelplinePage />} />
            <Route path="/experience" element={<ExperiencePage />} />
            <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/movie/:id/showtimes" element={<ShowtimesPage />} />
            <Route path="/movie/:id/seats" element={<SeatSelectionPage />} />
            <Route path="/movie/:id/payment" element={<PaymentPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </CityProvider>
  );
}

export default App;
