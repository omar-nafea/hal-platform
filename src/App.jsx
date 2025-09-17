import About from "./components/About/About";
import Home from "./components/Home/Home";
import Layout from "./components/Layout/Layout";
import Services from "./components/Services/Services";
import ShowIdea from "./components/ShowIdea/ShowIdea";
import Works from "./components/Works/Works";
import NotFound from "./components/NotFound/NotFound";
import "@fontsource-variable/cairo"; // Defaults to wght axis

import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Contact from "./components/Contact/Contact";
import ProjectDetails from "./components/Works/ProjectDetails/ProjectDetails";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "services", element: <Services /> },
      { path: "showIdea", element: <ShowIdea /> },
      { path: "works", element: <Works /> },
      { path: "contact", element: <Contact /> },
      { path: "projectDetails", element: <ProjectDetails /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
export default function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}
