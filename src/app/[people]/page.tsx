"use client";
import React, { useEffect, useState } from "react";
import { TUser } from "@/components/Form/Form";
import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa";

const PeoplePage = ({ params }: { params: { people: string } }) => {
  const [user, setUser] = useState<TUser | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch(
          `https://reqres.in/api/users/${params.people}`
        );
        const data = await response.json();
        // Assuming `data.data` is the user object
        setUser(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [params.people]);

  return (
    <div className="w-[1000px] mx-auto p-10">
      <section className="text-3xl font-bold  mb-10 flex gap-[10px] justify-center  space-x-10">
        <Link href="/">
          <span>
            <FaChevronLeft className="text-blue-700" />
          </span>
        </Link>
        <h1 className="text-blue-700 font-bold text-[2.2rem]">
          People Details
        </h1>
      </section>

      {user && (
        <section>
          <div className="flex justify-center">
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name} avatar`}
            />
          </div>
          <p className="text-center">{user.email}</p>
          <p className="text-center">{user.first_name}</p>
          <p className="text-center">{user.last_name}</p>
        </section>
      )}
    </div>
  );
};

export default PeoplePage;
