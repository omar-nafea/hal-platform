import "./index.css";
import { Outlet, NavLink } from 'react-router-dom';

export default function App() {
  const navLinkClasses = ({ isActive }) =>
    isActive
      ? 'text-text-primary font-bold border-b-2 border-text-primary pb-1'
      : 'text-text-secondary hover:text-text-primary transition-colors duration-200 pb-1 border-b-2 border-transparent';

  return (
    <div className="min-h-screen bg-primary font-sans text-text-primary">
      <header className="bg-secondary/80 backdrop-blur-md shadow-lg sticky top-0 z-10">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="text-2xl font-serif font-bold">
              <NavLink to="/">MyApp</NavLink>
            </div>
            <ul className="flex items-center space-x-4 sm:space-x-8 text-sm sm:text-base">
              <li><NavLink to="/" className={navLinkClasses}>Home</NavLink></li>
              <li><NavLink to="/about" className={navLinkClasses}>About</NavLink></li>
            </ul>
          </div>
        </nav>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Outlet />
      </main>

      <footer className="text-center py-8 text-text-secondary text-sm bg-secondary/50">
        <p>Built with React, React Router, Axios, and Tailwind CSS.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-text-primary transition-colors">Twitter</a>
          <a href="#" className="hover:text-text-primary transition-colors">GitHub</a>
          <a href="#" className="hover:text-text-primary transition-colors">LinkedIn</a>
        </div>
      </footer>
    </div>
  );
}
