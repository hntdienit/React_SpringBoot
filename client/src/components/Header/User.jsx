import { useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";

import EventBus from "../../Helpers/Auth/EventBus.jsx";
import { logout } from "../../Helpers/Auth/Auth.jsx";

export default function User() {
  let navigate = useNavigate();

  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
        // navigate("/");
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
      navigate("/");
    });
    return () => {
      // navigate("/");
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);

  return (
    <>
      <ul className="header-end">
        <li className="hearder-item">
          {currentUser ? (
            <Link to="/profile" className="btn btn-header">
              <span>{currentUser.username}</span>
            </Link>
          ) : (
            <Link to="/login" className="btn btn-header">
              <FaSignInAlt />
              <span>Sign In</span>
            </Link>
          )}
        </li>
        <li className="hearder-item">
          {currentUser ? (
            <Link to="#" className="btn btn-header" onClick={logOut}>
              <FaSignOutAlt />
              <span>Logout</span>
            </Link>
          ) : (
            <Link to="/register" className="btn btn-header">
              <FaUserPlus />
              <span>Sign Up</span>
            </Link>
          )}
        </li>
      </ul>
    </>
  );
}
