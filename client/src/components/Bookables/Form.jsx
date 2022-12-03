import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "react-query";
import { Link, Navigate } from "react-router-dom";
import { FaCloudUploadAlt, FaTrash, FaWindowClose } from "react-icons/fa";
import getData from "../../utils/api";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function BookableForm({ formState = {}, handleSubmit, handleDelete, roleAdmin }) {

  const { state = {}, handleChange, handleChecked } = formState;
  const { title = "", group = "", notes = "" } = state;
  const { days = [], sessions = [] } = state;

  const daysArray = useQuery("daysArray", () => axios.get("http://localhost:8080/days").then((res) => res.data));
  const sessionsArray = useQuery("sessionsArray", () =>
    axios.get("http://localhost:8080/sessions").then((res) => res.data)
  );

  if (daysArray.isLoading && sessionsArray.isLoading) {
    return <span>Loading...</span>;
  }

  if (daysArray.isError && sessionsArray.isError) {
    return <span>Have an errors: {daysArray.error.message + sessionsArray.error.message}</span>;
  }

  return (
    <main className="bookables-form">
      <div className="item item-form">
        <div className="item-header">
          <h2>{handleDelete ? "Edit" : "New"} Bookable</h2>
        </div>


        <label htmlFor="title" className="field">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />

        <label htmlFor="group" className="field">Group</label>
        <input
          type="text"
          name="group"
          value={group}
          onChange={handleChange}
        />

        <label htmlFor="notes" className="field">Notes</label>
        <textarea
          name="notes"
          value={notes}
          onChange={handleChange}
          rows="4"
        />

        <div className="bookable-availability">
          <ul>
            {daysArray.data?.map((item) => (
              <li key={item.id}><label>
                <input
                  // checked={days && days.map(data => data.name).indexOf(day) != -1}
                  type="checkbox"
                  name="days"
                  value={item.id}
                  onChange={handleChecked}
                />
                {item.name}
              </label></li>
            ))}
          </ul>

          <ul>
            {sessionsArray.data?.map((item) => (
              <li key={item.id}><label>
                <input
                  // checked={sessions && sessions.map(data => data.name).indexOf(session) !== -1}
                  type="checkbox"
                  name="sessions"
                  value={item.id}
                  onChange={handleChecked}
                />
                {item.name}
              </label></li>
            ))}
          </ul>
        </div>
      </div>

      <p className="controls">
        {handleDelete && (
          <button
            className="btn btn-delete controls-alt"
            onClick={handleDelete}
          >
            <FaTrash />
            <span>Delete</span>
          </button>
        )}
        <Link
          className="btn"
          to={state.id ? `/bookables/${state.id}` : "/bookables"}
          replace={false}
        >
          <FaWindowClose />
          <span>Cancel</span>
        </Link>
        <button
          className="btn"
          onClick={handleSubmit}
        >
          <FaCloudUploadAlt />
          <span>Save</span>
        </button>
      </p>
    </main>
  );
}