import { useState, useEffect, Fragment } from "react";

import Spinner from "../../components/Spinner/Spinner.jsx";
import Avatar from "./Avatar.jsx";

export default function UsersList() {
  // const [users, setUsers] = useState(null);
  const [userIndex, setUserIndex] = useState(0);
  // const user = users?.[userIndex];

  // useEffect(() => {
  //   fetch("http://localhost:3001/users")
  //     .then(resp => resp.json())
  //     .then(data => setUsers(data));
  // }, []);

  const dataUser = [
    {
      name: "dien",
      title: "tieu de 1",
      notes: "ghi chu 1",
    },
    {
      name: "phi",
      title: "tieu de 2",
      notes: "ghi chu 2",
    },
  ];
  const [users, setUsers] = useState(dataUser);
  const user = users?.[userIndex];

  if (users === null) {
    return (
      <p>
        <Spinner /> Loading users...
      </p>
    );
  }

  return (
    <Fragment>
      <ul className="users items-list-nav">
        {users.map((u, i) => (
          <li key={u.name} className={i === userIndex ? "selected" : null}>
            <button className="btn" onClick={() => setUserIndex(i)}>
              {u.name}
            </button>
          </li>
        ))}
      </ul>

      {user && (
        <>
              {/* <div className={isPending ? "item user user-pending" : "item user"}> */}
              <div className={"item user"}>
      <div className="item-header">
        <h2>{user.username}</h2>
      </div>

      <Avatar
        src={user.img ? `http://localhost:8080/img/${user.img}` : `http://localhost:8080/img/avatar.gif`}
        fallbackSrc="http://localhost:8080/img/avatar.gif"
        alt={user.username}
      />

      <div className="user-details">
        <h3>{user.title}</h3>
        <p>{user.notes}</p>
      </div>

      {/* <SuspenseList
        revealOrder="forwards"
      >
        <Suspense fallback={<p>Loading user bookings...</p>}>
          <UserBookings id={userID} />
        </Suspense>

        <Suspense fallback={<p>Loading user todos...</p>}>
          <UserTodos id={userID} />
        </Suspense>
      </SuspenseList> */}
    </div>
        </>
        // <div className="item user">
        //   <div className="item-header">
        //     <h2>{user.name}</h2>
        //   </div>
        //   <div className="user-details">
        //     <h3>{user.title}</h3>
        //     <p>{user.notes}</p>
        //   </div>
        // </div>
      )}
    </Fragment>
  );
}
