import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/user-forms/Login";
import Transfer from "../pages/transfer/Transfer";

function PrivateRoute({ children }) {
  const { fibremi_branch_admin_panel } = useContext(AuthContext);
  // console.log("fibremi_branch_admin_panel?.data?.token", fibremi_branch_admin_panel);
  return fibremi_branch_admin_panel?.access_token ? (
    children
  ) : (
    <Navigate to="/" />
  );
}
function RedirectToHome({ children }) {
  const { fibremi_branch_admin_panel } = useContext(AuthContext);

  return !fibremi_branch_admin_panel?.access_token ? (
    children
  ) : (
    <Navigate to="/dashboard" />
  );
}
const Navigation = () => {
  return (
    <div>
      <Routes>
        {/* <Route path="/" element={<Projects />} />
        <Route path="project-details/:id" element={<ProjectDetails />} /> */}
        <Route
          path="/"
          element={
            // <RedirectToHome>
            <Login />
            // </RedirectToHome>
          }
        />
        <Route
          path="/transfer"
          element={
            <PrivateRoute>
              <Transfer />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default Navigation;
