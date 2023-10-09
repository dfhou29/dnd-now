"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const router = useRouter();
  
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch("/api/new-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: email, password: password}),
    });

    router.push("/");
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email address</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Enter Email"
        onChange={handleEmail}
        required 
      />
      <label htmlFor="password">Email address</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Password"
        onChange={handleEmail}
        required 
      />
      <button type="submit">Login</button>
    </form>
  );
}
