import { useState } from "react"
import { Link } from "react-router-dom"
import { FaPhone, FaHome } from "react-icons/fa"
import "bootstrap/dist/css/bootstrap.min.css"

function Header({ propertySlug = null, navTitle = " " }) {
const [menuOpen, setMenuOpen] = useState(false)
const handleLinkClick = () => setMenuOpen(false)

const isPropertyPage = Boolean(propertySlug)

return (
<header>
  {/* Top utility bar (desktop only) */}
<div className="top-bar">
  <div className="top-bar-content">
    <a href="tel:+1234567890" className="top-bar-phone">
      (540) 667-6300
    </a>

    <div className="top-bar-links">
      <a href="https://castlerockmanagementllc.appfolio.com/connect/users/sign_in?portfolio_uuid=cb0facc2-f943-11f0-86d6-023e3c77b63c">Resident Portal</a>
      <span>|</span>
      <Link to="/vacancies"> Applicants</Link>
    </div>
  </div>
</div>
<div className="header-banner">
<div className="header-content">

{/* Left side */}
<div className="left-icons">

  {/* Site title */}
<Link to={propertySlug ? `/property/${propertySlug}` : '/'} className="nav-brand">
  {navTitle}
</Link>
  
<button
className="hamburger"
aria-label="Toggle menu"
aria-expanded={menuOpen}
onClick={() => setMenuOpen(prev => !prev)}
>
&#9776;
</button>

<Link to={propertySlug ? `/property/${propertySlug}` : '/'}
 className="home-icon">
<FaHome />
</Link>
</div>

{/* Desktop navigation */}
<nav className="nav-links">
<Link to={propertySlug ? `/property/${propertySlug}` : '/'}
 className="nav-link">Home</Link>

{/* ✅ ALWAYS visible */}
<Link to="/" className="nav-link">Properties</Link>

{/* 🏠 Property-only links */}
{isPropertyPage && (
<>
<Link
to={`/property/${propertySlug}/floor`}
className="nav-link"
>
Floor Plans
</Link>

<Link
to={`/property/${propertySlug}/amenities`}
className="nav-link"
>
Amenities
</Link>
</>
)}

<Link
  to={propertySlug ? `/property/${propertySlug}/contact` : "/contact"}
  className="nav-link"
>
  Contact
</Link>
<Link
  to={propertySlug ? `/property/${propertySlug}/location` : '/location'}
  className="nav-link"
>
  Location
</Link>
</nav>

{/* Phone */}
<a href="tel:+1234567890" className="phone-icon-2">
<FaPhone className="contact-icon-2" />
</a>
</div>
</div>

{/* Mobile menu */}
<div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
<Link to={propertySlug ? `/property/${propertySlug}` : '/'}
 className="mobile-link" onClick={handleLinkClick}>
Home
</Link>

<Link to="/" className="mobile-link" onClick={handleLinkClick}>
Properties
</Link>

{isPropertyPage && (
<>
<Link
to={`/property/${propertySlug}/floor`}
className="mobile-link"
onClick={handleLinkClick}
>
Floor Plans
</Link>

<Link
to={`/property/${propertySlug}/amenities`}
className="mobile-link"
onClick={handleLinkClick}
>
Amenities
</Link>
</>
)}

<Link
  to={propertySlug ? `/property/${propertySlug}/contact` : "/contact"}
  className="mobile-link"
  onClick={handleLinkClick}
>
  Contact
</Link>

<Link
  to={propertySlug ? `/property/${propertySlug}/location` : '/location'}
  className="mobile-link"
  onClick={handleLinkClick}
>
  Location
</Link>
</div>
</header>
)
}

export default Header

/*import { useState } from "react";
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

          {/* Left side: Hamburger + Home icon 
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

          {/* Desktop navigation *
          <nav className="nav-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to={propertyLink} className="nav-link">Properties</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <Link to="/location" className="nav-link">Location</Link>
            <Link to="/amenities" className="nav-link">Amenities</Link>
          </nav>

          {/* Right side: Phone icon 
          <a href="tel:+1234567890" className="phone-icon-2">
            <FaPhone className="contact-icon-2" />
          </a>

        </div>
      </div>

      {/* Mobile dropdown menu 
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

export default Header;*/
