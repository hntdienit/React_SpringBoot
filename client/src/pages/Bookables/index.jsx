import { useReducer, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { FaPlus } from "react-icons/fa";

import getData from "../../utils/api";

import reducer, { initialState } from "../../Helpers/Reducer/bookableReducer.jsx";

import Spinner from "../../components/Spinner/Spinner.jsx";

import BookablesList from "../../components/Bookables/List.jsx";
import BookableDetails from "../../components/Bookables/Details.jsx";
import { useState } from "react";

export default function BookablesPage() {
  const { user: currentUser } = useSelector((state) => state.auth);
  const [roleAdmin, setRoleAdmin] = useState(false);

  const [state, dispatch] = useReducer(reducer, initialState);

  const { group, bookableIndex, bookables } = state;
  const { hasDetails, isLoading, error } = state;

  const bookablesInGroup = bookables.filter((b) => b.group === group);
  let bookable = bookablesInGroup[bookableIndex];

  const { id } = useParams();
  if (id) {
    bookable = bookables.find((b) => b.id === parseInt(id, 10)) || bookables[0];
  }

  useEffect(() => {
    dispatch({ type: "FETCH_BOOKABLES_REQUEST" });

    getData("http://localhost:8080/bookables")
      .then((bookables) =>
        dispatch({
          type: "FETCH_BOOKABLES_SUCCESS",
          payload: bookables,
        })
      )

      .catch((error) =>
        dispatch({
          type: "FETCH_BOOKABLES_ERROR",
          payload: error,
        })
      );

    if (currentUser) {
      currentUser.roles.map((role) => {
        if (role === "ROLE_ADMIN") setRoleAdmin(true);
      });
    }
  }, []);

  if (error) {
    return <p>{error.message}</p>;
  }

  if (isLoading) {
    return (
      <p>
        <Spinner /> Loading bookables...
      </p>
    );
  }

  return (
    <main className="bookables-page">
      <div>
        <BookablesList group={group} bookableIndex={bookableIndex} bookables={bookables} dispatch={dispatch} />

        {currentUser ? (
          roleAdmin ? (
            <p className="controls">
              <Link to="/bookables/new" replace={true} className="btn">
                <FaPlus />
                <span>New</span>
              </Link>
            </p>
          ) : null
        ) : null}
      </div>
      <BookableDetails bookable={bookable} hasDetails={hasDetails} dispatch={dispatch} roleAdmin={roleAdmin} />
    </main>
  );
}
