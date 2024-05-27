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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

//   const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
//     if (event.target.files && event.target.files[0]) {
//       const avatarFile = event.target.files[0];
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setData((prev) => ({ ...prev, avatar: reader.result as string }));
//       };
//       reader.readAsDataURL(avatarFile);
//     }
//   };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
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

      setIsLoading(false);
    } catch (error) {
      console.error("Error submitting form:", error);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* {data.avatar && <img src={data.avatar} alt="avatar" />}
        <label htmlFor="avatar">Avatar</label>
        <input type="file" name="avatar" onChange={handleAvatarChange} /> */}

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
    </div>
  );
};

export default SignUp;
