import { useState } from "react";
import { Link } from "react-router-dom";
import { FaPhone, FaHome } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header({ propertySlug }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => setMenuOpen(false);

  // Construct the dynamic link for the current property
  const propertyLink = propertySlug ? `/property/${propertySlug}/floor` : '/floor';

  return (
    <header>
      <div className="header-banner">
        <div className="header-content">

          {/* Left side: Hamburger + Home icon */}
          <div className="left-icons">
            <button
              className="hamburger"
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(prev => !prev)}
            >
              &#9776;
            </button>

            <Link to="/" className="home-icon">
              <FaHome />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to={propertyLink} className="nav-link">Properties</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/location" className="nav-link">Location</Link>
            <Link to="/amenities" className="nav-link">Amenities</Link>
          </nav>

          {/* Right side: Phone icon */}
          <a href="tel:+1234567890" className="phone-icon-2">
            <FaPhone className="contact-icon-2" />
          </a>

        </div>
      </div>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
        <Link to="/" className="mobile-link" onClick={handleLinkClick}>Home</Link>
        <Link to={propertyLink} className="mobile-link" onClick={handleLinkClick}>Properties</Link>
        <Link to="/contact" className="mobile-link" onClick={handleLinkClick}>Contact</Link>
        <Link to="/location" className="mobile-link" onClick={handleLinkClick}>Location</Link>
        <Link to={`/property/${propertySlug}/amenities`}>Amenities</Link>

      </div>
    </header>
  );
}

export default Header;
