import React from "react";
import { Provider, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"; // Import Navigate for redirecting
import Header from "./Components/Header";
import LoginPage from "./Components/LoginPage";
import store from "./store/store";
import SignUpPage from "./Components/SignUpPage";
import SearchForm from "./Components/SearchForm";
import DataAvail from "./Components/DataAvail";
import TravelList from "./Components/TravelList";

const App = () => {
  const role = useSelector((state) => state.auth.role); // Get role from Redux store

  console.log("role", role);

  return (
    <Provider store={store}>
      <div className="App">
        <Routes>
          {/* Default route logic */}
          <Route
            path="/SearchForm"
            element={ <SearchForm /> }
          />
          
          {/* Dashboard route */}
          <Route path="/dashboard" element={<><Header /> <TravelList /></>} />

          {/* Sign up and Login routes */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          {/* Protected Routes - Only accessible by 'employee' */}
          <Route
            path="/searchform"
            element={role === "employee" ? <SearchForm /> : <Navigate to="/" />}
          />
          <Route
            path="/dataavail"
            element={ <DataAvail /> }
          />
        </Routes>
      </div>
    </Provider>
  );
};

export default App;
