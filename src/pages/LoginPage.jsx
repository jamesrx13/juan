import { useState } from "react";
import "../statics/css/pages/login.css";

import { login } from "./services/LoginServices";

import { inputFocus } from "./logic/Inputs";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiMail } from "react-icons/ci";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [viewPass, setViewPass] = useState("password");

  const [authState, setAuthState] = useState(false);


  const handleSubmit = async (e) => {
    setAuthState(true);
    const resp = await login(e);
    setAuthState(false);
    resp && navigate("/");

  }

  return (
    <main className="login">
      <section>
        <div className="head">
          <h1 className="login-card-title">Login</h1>
          <span>Insert your email and password to login</span>
        </div>

        <form onSubmit={handleSubmit} method="POST">
          <div className="input-grup">
            <label htmlFor="email">Email</label>
            <div className="input-icon">
              <input
                required
                type="email"
                id="email"
                name="email"
                placeholder="email@email.com"
                onFocus={inputFocus}
              />
              <CiMail />
            </div>
          </div>
          <div className="input-grup">
            <label htmlFor="password">Password</label>
            <div className="input-icon">
              <input
                onFocus={inputFocus}
                required
                type={viewPass}
                id="password"
                name="password"
                placeholder="******"
              />
              {viewPass === "password" ? (
                <AiOutlineEye
                  onClick={() =>
                    setViewPass(viewPass === "password" ? "text" : "password")
                  }
                />
              ) : (
                <AiOutlineEyeInvisible
                  onClick={() =>
                    setViewPass(viewPass === "password" ? "text" : "password")
                  }
                />
              )}
            </div>
          </div>
          <br />
          <button disabled={authState} type="submit">
            {!authState ? (
              <>Login</>
            ) : (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress size={25} />
              </Box>
            )}
          </button>
        </form>

        <p>Developer by Juanesxz</p>
      </section>
    </main>
  );
};
