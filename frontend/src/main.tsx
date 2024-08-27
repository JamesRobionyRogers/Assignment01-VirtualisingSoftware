import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, json, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from "@material-tailwind/react";

import PathConstants from './pathConstants';

import LandingRouter from "./routers/LandingRouter";
import DashboardRouter from "./routers/DashboardRouter";

import { LandingPage, LoginPage, SignupPage, ErrorPage } from './pages';
import NotFound from "./components/common/NotFound";

import ApplicationTracker from './views/ApplicationTracker';
import Application from './views/Application';
import Profile from './views/Profile';

import { fetchApplicationData } from './api';

import './index.css';

async function applicationLoader({ params }) {
  const { uuid } = params;
  const data = await fetchApplicationData(uuid);
  if (!data) {
    throw new Response('Not Found', { status: 404 });
  }
  return json(data);
}

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
        path: "/dashboard/application", 
        element: <Application />,
      },
      { 
        path: "/dashboard/application/:uuid", 
        element: <Application />,
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
