import { AnimatePresence } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import AnimatedBackground from './components/AnimatedBackground.jsx';
import CustomCursor from './components/CustomCursor.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import ScrollToTop from './components/ScrollToTop.jsx';
import ThemeProvider from './components/ThemeProvider.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import AboutPage from './pages/AboutPage.jsx';
import BuilderPage from './pages/BuilderPage.jsx';
import CheckerPage from './pages/CheckerPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import HomePage from './pages/HomePage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import ResumePage from './pages/ResumePage.jsx';
import WorkPage from './pages/WorkPage.jsx';

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path="work" element={<WorkPage />} />
          <Route path="resume" element={<ResumePage />} />
          <Route path="builder" element={<BuilderPage />} />
          <Route path="checker" element={<CheckerPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LoadingScreen />
      <ScrollProgress />
      <CustomCursor />
      <AnimatedBackground />
      <AppRoutes />
      <ScrollToTop />
    </ThemeProvider>
  );
}

export default App;
