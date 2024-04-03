import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Layout from "./layout/Layout";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";
import axios from "axios";


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
function App() {
  return (
    <div>
      <BrowserRouter>
      <AuthContextProvider>

        <Layout />
      </AuthContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
