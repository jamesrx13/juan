import { useState } from "react";
import "../statics/css/pages/login.css";

import { login } from "./services/LoginServices";

import { inputFocus } from "./logic/Inputs";

import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CiMail } from "react-icons/ci";

export const LoginPage = () => {
  const [viewPass, setViewPass] = useState("password");

  return (
    <main className="login">
      <section>
        <div className="head">
          <h1 className="login-card-title">Login</h1>
          <span>Insert your email and password to login</span>
        </div>

        <form onSubmit={login} method="POST">
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
          <button type="submit">Login</button>
        </form>

        <p>Developer by Juanesxz</p>
      </section>
    </main>
  );
};
