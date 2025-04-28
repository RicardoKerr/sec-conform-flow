
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full py-4 px-6 bg-iso-dark border-b border-iso-light border-opacity-30">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-iso-accent flex items-center justify-center">
            <span className="text-iso-dark font-bold text-lg">ISO</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-iso-text glow-text">ISO Guardian</h1>
            <p className="text-xs text-iso-text/70">ISO/IEC 27001 Compliance Assistant</p>
          </div>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className={`text-sm font-medium transition-colors ${isActive('/') 
              ? 'text-iso-accent border-b-2 border-iso-accent' 
              : 'text-iso-text hover:text-iso-accent'}`}
          >
            Home
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium transition-colors ${isActive('/about') 
              ? 'text-iso-accent border-b-2 border-iso-accent' 
              : 'text-iso-text hover:text-iso-accent'}`}
          >
            About
          </Link>
          <Link 
            to="/resources" 
            className={`text-sm font-medium transition-colors ${isActive('/resources') 
              ? 'text-iso-accent border-b-2 border-iso-accent' 
              : 'text-iso-text hover:text-iso-accent'}`}
          >
            Resources
          </Link>
          <Link 
            to="/contact" 
            className={`text-sm font-medium transition-colors ${isActive('/contact') 
              ? 'text-iso-accent border-b-2 border-iso-accent' 
              : 'text-iso-text hover:text-iso-accent'}`}
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;
