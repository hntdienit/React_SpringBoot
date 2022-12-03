import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

import { useSelector } from "react-redux";

export default function BookableDetails({ bookable, hasDetails, dispatch, roleAdmin }) {
  function toggleDetails() {
    dispatch({ type: "TOGGLE_HAS_DETAILS" });
  }

  return bookable ? (
    <div className="bookable-details item">
      <div className="item-header">
        <h2>{bookable.title}</h2>
        <span className="controls">
          <label>
            <input type="checkbox" onChange={toggleDetails} checked={hasDetails} />
            Show Details
          </label>

          {roleAdmin ? (
            <Link to={`/bookables/${bookable.id}/edit`} 
            // replace={true} 
            className="btn btn-header">
              <FaEdit />
              <span>Edit</span>
            </Link>
          ) : null}
        </span>
      </div>

      <p>{bookable.notes}</p>

      {hasDetails && (
        <div className="item-details">
          <h3>Availability</h3>
          <div className="bookable-availability">
            <ul>
              {bookable.days.sort().map((d, index) => (
                <li key={index}>{d.name}</li>
              ))}
            </ul>
            <ul>
              {bookable.sessions.map((s, index) => (
                <li key={index}>{s.name}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  ) : null;
}
