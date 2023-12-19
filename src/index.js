import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout';
import reportWebVitals from './reportWebVitals';
import AnimePage from './components/AnimePage/AnimePage';
import SignUp from './components/SignUp';
import LoginForm from './components/LoginForm';
import WatchList from './components/WatchList';

const App = lazy(() => import('./App'));

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Layout><Suspense fallback = {<div>Loding....</div>}><App /></Suspense></Layout>
  },
  {
    path: '/anime/:animeId',
    element: <Layout><Suspense fallback={<div>Loading...</div>}><AnimePage /></Suspense></Layout>
  },
  {
    path: '/',
    element: <Suspense fallback={<div>Loading...</div>}><SignUp/></Suspense>
  },
  {
    path: '/login',
    element: <Suspense fallback={<div>Loading...</div>}><LoginForm /></Suspense>
  },
  {
    path:'/user/watchList',
    element: <Layout><Suspense fallback={<div>Loading...</div>}><WatchList/></Suspense></Layout>
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
