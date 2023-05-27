import React from 'react';
import ErrorPage from "./error-page";
import App from './App';
const routesConfig = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
];

export default routesConfig;