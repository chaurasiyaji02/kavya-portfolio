import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer.jsx';
import Navbar from '../components/Navbar.jsx';

function AppLayout() {
  return (
    <div className="relative flex min-h-screen flex-col">
      <a
        className="focus-ring fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition focus:translate-y-0 dark:bg-white dark:text-slate-950"
        href="#main-content"
      >
        Skip to main content
      </a>
      <Navbar />
      <main className="flex-1 px-4 pb-16 pt-8 sm:px-6 lg:px-8" id="main-content" tabIndex="-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
