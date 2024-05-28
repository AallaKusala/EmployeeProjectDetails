import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProjectDetails from './Components/ProjectDetails';
import Login from './Components/Login';
import EmployeeDetails from './Components/EmployeeDetails';




const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/projectdetails",
    element: <ProjectDetails />
  },
  {
    path: "/employeedetails",
    element: <EmployeeDetails />
  }
]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
