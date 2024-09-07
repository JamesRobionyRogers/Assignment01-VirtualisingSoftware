import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from "@material-tailwind/react";

import PathConstants from './pathConstants';

import LandingRouter from "./routers/LandingRouter";
import DashboardRouter from "./routers/DashboardRouter";

import { LandingPage, LoginPage, SignupPage, ErrorPage } from './pages';
import NotFound from "./components/common/NotFound";

import ApplicationTracker from './views/ApplicationTracker';
import Profile from './views/Profile';

import { handleAddApplication } from './actions';    // TODO: Could be added to actions.ts
import { applicationLoader } from './loaders';

import './index.css';

const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: PathConstants.HOME,
    element: <LandingRouter />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PathConstants.HOME,
        element: <LandingPage />,
      },
      {
        path: PathConstants.LOGIN,
        element: <LoginPage />,
      },
      {
        path: PathConstants.SIGNUP,
        element: <SignupPage />,
      },
    ]
  },
  {
    path: PathConstants.DASHBOARD,
    element: <DashboardRouter />,
    children: [
      {
        path: PathConstants.DASHBOARD,
        element: <ApplicationTracker />,
      },
      { 
        path: "/dashboard/applications/new", 
        element: <ApplicationTracker />,
        action: handleAddApplication,
      },
      { 
        path: "/dashboard/applications/:uuid", 
        element: <ApplicationTracker />,
        loader: applicationLoader,
      },

      {
        path: PathConstants.GENERATE,
        element: <NotFound />,
      },
      {
        path: PathConstants.ARCHIVE,
        element: <NotFound />,
      },
      {
        path: PathConstants.PROFILE,
        element: <Profile />,
      },
    ],
  },  
], { basename: PathConstants.BASENAME });


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
)
