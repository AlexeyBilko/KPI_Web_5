import React from "react";
// import { Switch, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Login } from "./Login";
import MainPage from "./MainPage";

function App() {
  const { isLoading } = useAuth0();
  if (isLoading)
    return <h1>Loading..</h1>;
  return (
    <>
      {/* <Switch>
        <Route path="/login" component={Login} exact />
        <Route path="/" component={MainPage} exact />
      </Switch> */}
      <div>hello</div>
    </>
  );
}

export default App;
