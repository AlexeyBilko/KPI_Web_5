import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const wsLink = new WebSocketLink({
  uri: 'wss://kpi-web-lab5-auth.herokuapp.com/v1/graphql',
  options: {
    reconnect: true,
  },
});
const client = new ApolloClient({
  link: wsLink,
  uri: 'https://kpi-web-lab5-auth.herokuapp.com/v1/graphql',
  cache: new InMemoryCache(),
});

const domain = 'dev-jman78l5.us.auth0.com';
const clientId = 'GPiyrhSmfYAqTTXBMYxXkXSHpbTSO8ro';

ReactDOM.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    redirectUri={window.location.origin}
    audience="https://dev-jman78l5.us.auth0.com/api/v2/"
    scope="read:current_user update"
  >
    <ApolloProvider client={client}>
        <Router>
          <App />
        </Router>
    </ApolloProvider>
  </Auth0Provider>,
  document.getElementById("root")
);
