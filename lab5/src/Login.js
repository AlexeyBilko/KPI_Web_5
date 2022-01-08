import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import MainPage from "./MainPage";

function Login(){
    const { loginWithPopup, isAuthenticated } = useAuth0();
   if (isAuthenticated)
     return <MainPage to="/" />;
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

export default Login;