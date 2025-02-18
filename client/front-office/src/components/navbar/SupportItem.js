import React from 'react';
import { Link } from 'react-router-dom';

const SupportItem = () => (
  <li className="nav-item dropright">
    <Link className="nav-link" data-toggle="dropdown" to="/">
      <span>Support</span>
    </Link>
    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
      <div className="dropdown-divider" />
      <Link className="dropdown-item " to="/">
        FAQ
      </Link>
      <div className="dropdown-divider" />
      <Link to="/" className="dropdown-item ">
        Contact us
      </Link>
    </div>
  </li>
);
export default SupportItem;
