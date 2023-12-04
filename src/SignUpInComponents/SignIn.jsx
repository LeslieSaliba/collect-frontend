import React from "react";
import "../css/login.css";
const SignIn = () => {
  return (
    <div>
      <div className="authform sign-in-form">
        <h2 className="sign-up-in-title">Welcome back</h2>
        <form>
          <div>
            <label className="authform-label">Email</label>
            <input className="input-signupin" type="email" name="email" />
          </div>
          <div>
            <label className="authform-label">Password</label>
            <input className="input-signupin" type="password" name="password" />
          </div>
          <p className="forgot-pass">Forgot password?</p>
          <button className="submitBtn" color="primary">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
