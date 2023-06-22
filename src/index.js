import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import "./index.css";

import App from './App';

const root = createRoot(document.getElementById('root'));

root.render(
<BrowserRouter>
  <Auth0Provider
    domain="dev-jk0b84ykhtqa22hv.us.auth0.com"
    clientId="Ay7MVhW9SNsauKAtEDsQ8nrEzA4Bxf3H"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  > 
    <App />  
  </Auth0Provider>
</BrowserRouter>
);


