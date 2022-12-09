import { Link } from "react-router-dom";
import { FaCalendarAlt, FaDoorOpen, FaUsers } from "react-icons/fa";

import HeaderUser from "./User.jsx"

export default function Header() {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li className="hearder-item">
              <Link to="/bookings" className="btn btn-header">
                <FaCalendarAlt />
                <span>Bookings</span>
              </Link>
            </li>
            <li className="hearder-item">
              <Link to="/bookables" className="btn btn-header">
                <FaDoorOpen />
                <span>Bookables</span>
              </Link>
            </li>
            <li className="hearder-item">
              <Link to="/users" className="btn btn-header">
                <FaUsers />
                <span>Users</span>
              </Link>
            </li>
          </ul>
        </nav>
        <HeaderUser />
      </header>
    </>
  );
}
