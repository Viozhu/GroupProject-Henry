import React, { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import imgDefault from '../../assets/img/profile-default.png';

const Profile = () => {
  const userData = useSelector((store) => store.authReducers.sessionData.loggedUser);
  const sessionData = useSelector((store) => store.authReducers.sessionData);
  const img = userData.user ? userData.profile : imgDefault;
  useEffect(() => {
    console.log(sessionData.timestamp);
  }, [sessionData]);
  return (
    <div className="card-body box-profile">
      <div className="text-center">
        <img className="profile-user-img img-fluid img-circle" src={img} alt="User profile" />
      </div>

      <h3 className="profile-username text-center">
        {userData.user ? userData.user.first_name : ''}
        {userData.user ? userData.user.last_name : ''}
      </h3>

      <p className="text-muted text-center">Customer</p>

      <ul className="list-group list-group-unbordered mb-3">
        <li className="list-group-item">
          <b>Plan</b> <p className="float-right">{userData.user ? userData.plan.name : ''}</p>
        </li>
        <p className="btn btn-primary btn-block">
          <b>Upgrade Profile</b>
        </p>
        <li className="list-group-item">
          <b>Email</b> <p className="float-right">{userData.user ? userData.user.email : ''}</p>
        </li>
        <li className="list-group-item">
          <b>Telephone</b> <p className="float-right">{userData.user ? userData.user.phone : ''}</p>
        </li>
      </ul>
      <Link to="/edit" className="btn btn-primary btn-block">
        <b>Change Info</b>
      </Link>
    </div>
  );
};

export default Profile;
