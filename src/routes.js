import React from 'react';
import ErrorPage from "./error-page";
// import LoginRoute from './routes/login-route';
import App from './App';
import { MenuEditor } from './components/menu-editor';
import { DishEditor } from './components/dish-editor';


const routesConfig = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    // action: rootAction,
    children: [
      // {
      //   path: "login",
      //   element: <LoginRoute />
      // },
      {
        path: 'menu-editor/:merchantId',
        element: <MenuEditor />,
        // loader: interactiveMasterMapLoader
      },
      {
        path: 'menu-editor/:merchantId/dish/create',
        element: <DishEditor />,
        // loader: interactiveMasterMapLoader
      },
      {
        path: 'menu-editor/:merchantId/dish/:dishId',
        element: <DishEditor />,
        // loader: interactiveMasterMapLoader
      },
    ],
  },
];

export default routesConfig;