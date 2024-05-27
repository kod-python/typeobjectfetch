"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';

const SignUp = () => {
  const [data, setData] = useState({
    avatar: "",
    username: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    

    if (!data.email || !data.username || !data.password) {
      setErrorMessage("please fill in the space.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch("https://reqres.in/api/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      console.log(responseData);

      if (response.ok) {
        setSuccessMessage("User created successfully!");
      } else {
        setErrorMessage("Error creating user.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Error submitting form.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={data.email}
          onChange={handleChange}
        />

        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          value={data.username}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={data.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    <p className='text-green-500'>{successMessage}</p>
      <p className='text-red-500'>{errorMessage}</p>
    </div>
  );
};

export default SignUp;
