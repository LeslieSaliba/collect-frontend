import React, { useState } from "react";


import SignIn from "../SignUpInComponents/SignIn";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div class="authform-body">
      <div className={`auth-form-cont ${isSignUp ? "s--signup" : ""}`}>
        <SignIn />
        <div className="sign-up-in-toggle">
          <div className="sign-up-in-toggle-img">
            <div className="sign-up-in-toggle-text m--up">
              <h2 style={{ color: "#fff" }}>New here?</h2>
              <p>Sign up to unlock premium services for your pet!</p>
            </div>
            <div className="sign-up-in-toggle-text m--in">
              <h2>One of us?</h2>
              <p>
                If you already have an account, just sign in. We've missed you!
              </p>
            </div>

            <div className="sign-up-in-toggle-btn" onClick={toggleForm}>
              <span className="m--up">Sign Up</span>
              <span className="m--in">Sign In</span>
            </div>
          </div>

          <div className="authform sign-up">
            <h2 className="sign-up-in-title">Time to feel like home</h2>
            <form className="transform scale-95 mr-4">
              <div className="flex justify-left">
                <div>
                  <label className="authform-label">First name</label>
                  <input
                    className="input-signupin"
                    type="text"
                    name="Firstname"
                  />
                </div>
                <div>
                  <label className="authform-label">Last name</label>
                  <input
                    className="input-signupin"
                    type="text"
                    name="Lastname"
                  />
                </div>
              </div>

              <label className="authform-label">Email</label>
              <input className="input-signupin" type="email" name="email" />

              <div>
                <div>
                  <label className="authform-label">Password</label>
                  <input
                    className="input-signupin"
                    type="password"
                    name="password"
                  />
                </div>
              </div>
              <div>
                <div>
                  <label className="authform-label">Phone number</label>
                  <input className="input-signupin" type="text" name="phone" />
                </div>
              </div>

              <div className="flex justify-center">
                 <div>
                  <label className="authform-label">City</label>
                  <input
                    className="input-signupin"
                    type="text"
                    name="City"
                  />
                </div>
                <div>
                  <label className="authform-label">Street</label>
                  <input
                    className="input-signupin"
                    type="text"
                    name="Street"
                  />
                </div>
              </div>

              <div className="flex justify-center">
             
                <div>
                  <label className="authform-label">Building</label>
                  <input
                    className="input-signupin"
                    type="text"
                    name="Building"
                  />
                </div>
                <div>
                  <label className="authform-label">Floor</label>
                  <input
                    className="input-signupin"
                    type="text"
                    name="Floor"
                  />
                </div>
              </div>

              <label className="authform-label">Description</label>
              <input className="input-signupin" type="text" name="Description" />

              <button className="submitBtn" color="primary">
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
