import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { FaSignInAlt, FaUserPlus, FaSignOutAlt } from "react-icons/fa";


import EventBus from "../../Helpers/Auth/EventBus.jsx";
import { logout } from "../../Helpers/Auth/Auth.jsx";

import Spinner from "../Spinner/Spinner.jsx";

export default function User() {

    let navigate = useNavigate();


  // const dataUser = [
  //   {
  //     name: "dien",
  //   },
  //   {
  //     name: "phi",
  //   },
  // ];
  // const [users, setUsers] = useState(dataUser);

  // //   useEffect(() => {

  // //     fetch("http://localhost:3001/users")
  // //       .then(resp => resp.json())
  // //       .then(data => setUsers(data));

  // //   }, []);

  // if (users === null) {
  //   return <Spinner />;
  // }

  // moi
  // const { user: currentUser } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const logOut = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      // navigate("/");
      EventBus.remove("logout");
    };
  }, [currentUser, logOut]);
  // moi

  return (
    <>
      <ul className="header-end">
        <li>
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
        <li>
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
