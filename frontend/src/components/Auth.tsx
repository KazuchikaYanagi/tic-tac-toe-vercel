import React, { useState } from "react";
import { signup, login } from "../api";

const Auth: React.FC = () => {
  const [isSignup, setIsSignup] = useState<boolean>(false);
  const [formData, setFormData] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSignup) {
      await signup(formData);
    } else {
      const { data } = await login(formData);
      localStorage.setItem("token", data.token);
      // store user info, redirect, etc.
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>{isSignup ? "Sign Up" : "Login"}</h2>
        <input
          type="text"
          placeholder="user name"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
        <input
          type="password"
          placeholder="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />
        <button type="submit">{isSignup ? "register" : "Login"}</button>
        <button type="button" onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Here is Login" : "Here is Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
