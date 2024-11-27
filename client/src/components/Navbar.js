import { React, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { logout } from '../actions/authdonor';

const Navbar = ({ auth: { isAuthenticated, Donor }, logout }) => {
  // Define inline animation styles for the image
  const imageStyle = {
    height: '50px',
    width: '70px',
    marginRight: '10px',
    transition: 'transform 0.3s ease-in-out', // Smooth transition for animation
  };

  // Define hover effect for image scaling and rotation
  const hoverStyle = {
    transform: 'scale(1.2) rotate(360deg)', // Scale and rotate the image on hover
    transition: 'transform 0.3s ease-in-out', // Transition effect for hover
  };

  const authlinks = (
    <ul>
      <li>
        <Link to="/Hospitals">
          <i className="fa-solid fa-hospital"></i> Hospitals
        </Link>
      </li>
      <li>
        <Link to="/Donors">
          <i className="fa-solid fa-users"></i> Donors
        </Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-stream"></i> Dashboard
        </Link>
      </li>
      <li>
        <Link onClick={logout} to="/">
          <i className="fas fa-sign-out-alt" /> logout
        </Link>
      </li>
    </ul>
  );

  const guessLinks = (
    <ul>
      <li><Link to="/">HOME</Link></li>
      <li><Link to="/About">ABOUT</Link></li>
    </ul>
  );

  return (
    <nav className="navbar bg-danger">
      <h1>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          {/* Image with hover animation */}
          <img
            src="blood.ico"
            alt="BloodBridge Logo"
            style={imageStyle}  // Apply image style
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.2) rotate(360deg)'} // Hover effect using inline style
            onMouseLeave={(e) => e.target.style.transform = 'scale(1) rotate(0deg)'} // Reset hover effect
          />
          <span style={{ fontSize: '36px', fontWeight: 'bold', color: 'white' }}>DropOfLife</span>
        </Link>
      </h1>
      <Fragment>{isAuthenticated ? authlinks : guessLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
