import React, { useContext, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("amasudul96@gmail.com");
  const [password, setPassword] = useState("Password100@");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});

  // const { enqueueSnackbar } = useSnackbar();
  // const validation = () => {
  //   let isError = false;
  //   if (!email.trim()) {
  //     handleSnakbarOpen("Please enter email address", "error");
  //     document.getElementById("email").focus();
  //     return (isError = true);
  //   } else if (
  //     !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
  //       email.trim()
  //     )
  //   ) {
  //     handleSnakbarOpen("Invalid email address", "error");
  //     document.getElementById("email").focus();
  //     return (isError = true);
  //   }

  //   if (!password.trim()) {
  //     handleSnakbarOpen("Please enter password", "error");
  //     document.getElementById("password").focus();
  //     return (isError = true);
  //   }
  //   return isError;
  // };
  // const handleSnakbarOpen = (msg, vrnt) => {
  //   let duration;
  //   if (vrnt === "error") {
  //     duration = 3000;
  //   } else {
  //     duration = 1000;
  //   }
  //   enqueueSnackbar(msg, {
  //     variant: vrnt,
  //     autoHideDuration: duration,
  //   });
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      let url = `/api/v1/public/auth/signin`;
      let data = {
        email: email.trim(),
        password: password.trim(),
        grant_type: process.env.REACT_APP_GRANT_TYPE,
        client_id: process.env.REACT_APP_CLIENT_ID,
        client_secret: process.env.REACT_APP_CLIENT_SECRECT,
        scope: process.env.REACT_APP_SCOPE,
      };
      // let res = await handlePostData(url, data);
      let res = await axios({
        url: url,
        method: "post",
        data: data,
      });

      console.log("res.data.data", res);
      if (res?.status > 199 && res?.status < 300) {
        // handleSnakbarOpen("Successfull", "success");
        login(res?.data);
        navigate("/transfer");
        // login({
        //   email: email.trim(),
        //   password: password.trim(),
        //   ...res.data.data,
        // });
      }
      setLoading(false);

      // login(data);
      // setLoading(false);
      // navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      console.log("catch error", error);
      if (error?.response?.status === 500) {
        // handleSnakbarOpen(error?.response?.statusText, "error");
      } else {
        // handleSnakbarOpen(error?.response?.data?.message, "error");
        setErrors(error.response.data.errors);
      }
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        style={{ width: "550px", paddingLeft: "72px", paddingRight: "72px" }}
        className="jumbotron"
        onSubmit={handleSubmit}
      >
        <h2 class="fw-bold mb-2 text-uppercase text-center">Login</h2>
        <p class="text-gray-50 mb-4 text-center text-muted">
          Please enter your email and password!
        </p>
        <p style={{ fontWeight: 500, marginBottom: "4px" }}>Email</p>
        <input
          required
          style={{
            marginBottom: "16px",
            paddingTop: "24px",
            paddingBottom: "24px",
          }}
          type="email"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <p style={{ fontWeight: 500, marginBottom: "4px" }}>Password</p>
        <input
          required
          style={{ paddingTop: "24px", paddingBottom: "24px" }}
          type="password"
          class="form-control"
          aria-label="Sizing example input"
          aria-describedby="inputGroup-sizing-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p class="  mt-3  mb-4 pb-lg-2 text-right text-muted ">
          Forgot password?
        </p>
        <div className="text-center">
          <button
            type="submit"
            class="btn btn-primary"
            style={{ width: "100%", paddingTop: "12px", paddingBottom: "12px" }}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
