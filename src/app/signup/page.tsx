'use client';

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

const SignUpPage = () => {

  const router = useRouter()

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: ""
  })

  const [buttonDisable, setButtonDisable] = useState(false)

  const [loading, setLoading] = useState(false)

  const onSignUp = async () => {
    try {
      setLoading(true)
      const response = await axios.post("/api/users/signup", user)
      console.log("Signup Success", response.data)
      router.push('/login')

    } catch (error: any) {
      console.log("signup failed")
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisable(false)
    }
    else setButtonDisable(true)

  }, [user])

  return (
    <section className="text-gray-400 bg-gray-900 body-font h-screen">
      <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
        <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
          <h1 className="title-font font-medium text-3xl text-white">Welcome to NextJS Auth</h1>
          <p className="leading-relaxed mt-4">This project plays with the user authentication in NextJS</p>
        </div>
        <div className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <h2 className="text-white text-lg font-medium title-font mb-5">Sign Up</h2>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-400">Email</label>
            <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} type="email" id="email" name="email" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-400">Password</label>
            <input value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} type="password" id="password" name="password" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <div className="relative mb-4">
            <label htmlFor="username" className="leading-7 text-sm text-gray-400">Username</label>
            <input value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} type="text" id="username" name="username" className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-green-900 rounded border border-gray-600 focus:border-green-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
          <button onClick={onSignUp} disabled={buttonDisable} className="text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg disabled:bg-gray-700 disabled:text-red-800">{loading ? "Processing" : "Sign Up"}</button>
          <p className="text-xs mt-3">Already a member? <Link className='text-yellow-600' href='/login'>Login</Link></p>
        </div>
      </div>
    </section>
  )
}

export default SignUpPage