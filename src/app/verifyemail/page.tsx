'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

const VerifyEmailPage = () => {

  const [token, setToken] = useState("")
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState(false)

  const verifyUserEmail = async () => {

    try {
      await axios.post('/api/users/verifyemail', { token })
      setVerified(true)
      setError(false)
    } catch (error: any) {
      setError(true)
      console.log(error.response.data)
    }

  }

  useEffect(() => {
    setError(false)
    const urlToken = window.location.search.split("=")[1]
    setToken(urlToken || "")
  }, [])

  return (
    <section className="text-gray-400 bg-gray-900 body-font h-screen flex flex-wrap items-center">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-2/3 flex flex-col sm:flex-row sm:items-center items-start mx-auto">
          <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-white">Verify your account</h1>
          <button onClick={verifyUserEmail} className="flex-shrink-0 text-white bg-green-500 border-0 py-2 px-8 focus:outline-none hover:bg-green-600 rounded text-lg mt-10 sm:mt-0">Verify</button>
        </div>
        {verified && (<p className="lg:w-2/3 mx-auto leading-relaxed text-base">Account Verified. <Link className='text-yellow-600' href={'/login'}>Login</Link></p>)}
        {error && (<p className="lg:w-2/3 mx-auto leading-relaxed text-base">Error in Verification</p>)}
      </div>
    </section>
  )
}

export default VerifyEmailPage