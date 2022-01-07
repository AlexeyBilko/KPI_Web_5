import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
// import { Redirect } from "react-router-dom";

export const Login = () => {
  const { loginWithPopup, isAuthenticated } = useAuth0();
//   if (isAuthenticated)
//     return <Redirect to="/" />;
  return (
    <div>
      <button
        onClick={async () => {
          loginWithPopup();
        }}
      >
        Log in
      </button>
    </div>
  );
};
