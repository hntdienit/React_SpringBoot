import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container">
      <div className="profile-card">
        <div className="row gutters-sm">
          <div className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-column align-items-center text-center">
                  <img
                    src="https://bootdey.com/img/Content/avatar/avatar7.png"
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                  />
                  <div className="mt-3">
                    <h4>Username: {currentUser.username}</h4>
                    <p className="text-secondary mb-1"><strong>Email:</strong> {currentUser.email}</p>
                    {/* <p className="text-muted font-size-sm">Bay Area, San Francisco, CA</p>
                    <button className="btn btn-primary">Follow</button>
                    <button className="btn btn-outline-primary">Message</button> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="card mt-3"></div>
          </div>
          <div className="col-md-8">
            <div className="card mb-3">
              <div className="card-body">
                <div className="row">
                  <div className="col-sm-3">
                    <h3 className="mb-0">Authorities</h3>
                  </div>
                  {currentUser.roles && currentUser.roles.map((role, index) => <div key={index} className="col-sm-9 text-secondary hearder-item">{role}</div>)}
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
