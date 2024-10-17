import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import "./ProfilePage.css"

const ProfilePage = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="loading">Loading ...</div>;
  }

  return (
    <div className="profile-div">
      <img src={user.picture} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
};

export default ProfilePage;