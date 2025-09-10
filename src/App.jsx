
import { Outlet, NavLink } from 'react-router-dom';
// Main App Shell/Layout Component
// This component includes the shared layout (like header/footer) and an <Outlet>
// for rendering the current route's component.
export default function App() {
  const navLinkClasses = ({ isActive }) =>
    isActive
      ? 'text-blue-600 font-bold border-b-2 border-blue-600 pb-1'
      : 'text-gray-600 hover:text-blue-600 transition-colors duration-200 pb-1 border-b-2 border-transparent';

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800">
      <header className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center justify-center space-x-4 sm:space-x-8 h-16 text-sm sm:text-base">
            <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
            <li><NavLink to="/about" className={navLinkClasses}>About</NavLink></li>
          </ul>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* The Outlet component renders the matched child route component. */}
        <Outlet />
      </main>

      <footer className="text-center py-6 text-gray-500 text-sm bg-gray-100">
        <p>Built with React, React Router, Axios, and Tailwind CSS.</p>
      </footer>
    </div>
  );
}
