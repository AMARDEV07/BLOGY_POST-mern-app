
import React from 'react'
import { SignIn } from "@clerk/clerk-react";

function LoginPage() {
  return (
    <div className='flex justify-center items-center min-h-[80vh]'>
      <SignIn signUpUrl='/register'
      />
    </div>
  )
}

export default LoginPage