"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";

export type TUser = { id:number, avatar:string, email:string, first_name:string, last_name:string,}

const userForm = () => {

const [users, setUsers] = useState<TUser[]>([]);

useEffect(()=>{
const getUsers = async ()=>{
const response = await fetch("https://reqres.in/api/users/");
const data = await response.json()
// console.log(data)
setUsers(data.data)

}
  getUsers()

},[]);




  return (
    <div>
    <h1 className="text-[2rem] font-bold uppercase text-gray-500 text-center mt-[40px]">Poeples Details</h1>

      <div className="flex flex-wrap items-center justify-center w-1/1 mx-auto mt-[100px] m-[40px]">
        
        
  {users.map((user) => 

<div key={user.id} className="mx-auto  shadow-lg p-[40px] hover:scale-[1.2]">

<div className="text-center p-[20px]">

<p>{user.id}</p>

<div className="flex justify-center">
<img src={user.avatar} alt="" />
</div>

<p className="text-gray-500 mt-3">{user.email}</p>
<p className="text-gray-500 mt-2">{user.first_name}</p>
<p className="text-gray-500 mt-2">{user.last_name}</p>

<Link href={`/ ${user.id}`}>

<div className="flex justify-center">
    <button className="py-1 px-4 bg-gray-400 mt-[30px] roudded">view Details</button>
</div>

</Link>


</div>



</div>


)}
        
        
        
        </div>  



    </div>
  )
}

export default userForm