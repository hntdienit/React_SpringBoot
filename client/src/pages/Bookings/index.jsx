import getData from "../../utils/api";
import Spinner from "../../components/Spinner/Spinner.jsx";

import { useReducer, useEffect } from "react";
import reducer, { initialState } from "../../Helpers/Reducer/bookableReducer.jsx";

import BookablesList from "../../components/Bookables/List.jsx";
import Bookings from "../../components/Bookings/Bookings.jsx";
import { useParams } from "react-router-dom";

export default function BookingsPage() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const { group, bookableIndex, bookables } = state;
  const { isLoading, error } = state;

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
    <main className="bookings-page">
      <BookablesList
        group={group} bookableIndex={bookableIndex} bookables={bookables} dispatch={dispatch} 
      />
      <Bookings
        bookable={bookable}
      />
    </main>
  );
}