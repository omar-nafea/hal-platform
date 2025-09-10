import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import App from "./App";
import Home from "./components/Home";
import ErrorPage from "./components/NotFound";
import About from "./components/About";
import "./index.css";
const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
   <Routes>
     <Route path="/" element={<App />}>
       <Route index element={<Home />} />
       <Route path="*" element={<ErrorPage />} />
       <Route path="about" element={<About />} />
     </Route>
   </Routes>

  </BrowserRouter>,
);
