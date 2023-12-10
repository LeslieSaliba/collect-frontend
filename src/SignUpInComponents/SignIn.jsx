import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/login.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Login successfully");
  
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userId", data.data._id);
        localStorage.setItem("role", data.data.role);
  
        if (data.data.role === "client") {
          const cartResponse = await fetch(`${process.env.REACT_APP_API_URL}/cart/getByUserID/${data.data._id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.data.token}`,
            },
          });
  
          const cartData = await cartResponse.json();
  
          if (cartResponse.ok) {
            console.log("Cart found:", cartData.data);
            localStorage.setItem("cartId", cartData.data._id);
          } else if (cartResponse.status === 404) {
            console.log("No cart found. Creating one...");
  
          
            const createCartResponse = await fetch(`${process.env.REACT_APP_API_URL}/cart/create/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.data.token}`,
              },
              body: JSON.stringify({ userID: data.data._id }),
            });
  
            const createCartData = await createCartResponse.json();
  
            if (createCartResponse.ok) {
              console.log("Cart created successfully");
              localStorage.setItem("cartId", createCartData.data._id);
            } else {
              console.error("Unable to create cart:", createCartData.message);
            }
          }
  
  
          const wishlistResponse = await fetch(`${process.env.REACT_APP_API_URL}/wishlist/getByUserID/${data.data._id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${data.data.token}`,
            },
          });
  
          const wishlistData = await wishlistResponse.json();
  
          if (wishlistResponse.ok) {
            console.log("Wishlist found:", wishlistData.data);
            localStorage.setItem("wishlistId", wishlistData.data._id);
          } else if (wishlistResponse.status === 404) {
            console.log("No wishlist found. Creating one...");
  
            const createWishlistResponse = await fetch(`${process.env.REACT_APP_API_URL}/wishlist/create/`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${data.data.token}`,
              },
              body: JSON.stringify({ userID: data.data._id }),
            });
  
            const createWishlistData = await createWishlistResponse.json();
  
            if (createWishlistResponse.ok) {
              console.log("Wishlist created successfully");
              localStorage.setItem("wishlistId", createWishlistData.data._id);
            } else {
              console.error("Unable to create wishlist:", createWishlistData.message);
            }
          }
  
          navigate("/");
        }
      } else {
        console.error("Login failed:", data.message);
      }
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  };

  return (
    <div>
      <div className="authform sign-in-form">
        <h2 className="sign-up-in-title">Welcome back</h2>
        <form onSubmit={handleSignIn}>
          <div>
            <label className="authform-label">Email</label>
            <input
              className="input-signupin"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="authform-label">Password</label>
            <input
              className="input-signupin"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="forgot-pass">Forgot password?</p>
          <button className="submitBtn" color="primary" type="submit">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;