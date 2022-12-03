import { Fragment } from "react";
import { FaTrash, FaCloudUploadAlt } from "react-icons/fa";

import useFormState from "../../Helpers/FormState/bookable.jsx";

export default function BookingForm({ booking, bookable, onSave, onDelete }) {
  const { state, handleChange } = useFormState(booking);
  const isNew = booking?.id === undefined;

  return booking ? (
    <Fragment>
      <div className="booking-details-fields item-form">
        <label>Title</label>
        <p>
          <input
            type="text"
            name="title"
            disabled
            value={state.title}
            onChange={handleChange}
          />
        </p>

        <label>Bookable</label>
        <p>{bookable.title}</p>

        <label>Booking Date</label>
        <p>{(new Date(booking.date)).toLocaleDateString()}</p>

        <label>Session</label>
        <p>{booking.session}</p>

        <label>Notes</label>
        <p>
          <textarea
            name="notes"
            disabled
            rows={6}
            cols={30}
            value={booking.notes}
            onChange={handleChange}
          />
        </p>
      </div>

      {/* <p className="controls">
        {!isNew && (
          <button
            className="btn btn-delete"
            onClick={() => onDelete(booking)}
          >
            <FaTrash />
            <span>Delete</span>
          </button>
        )}
        <button
          className="btn"
          onClick={() => onSave(state)}
        >
          <FaCloudUploadAlt />
          <span>{isNew ? "Add Booking" : "Update"}</span>
        </button>
      </p> */}
    </Fragment>
  ) : null;
}