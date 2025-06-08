import React from "react";
import { SignUp } from "@clerk/clerk-react";

function RegisterPage() {
  return (
      <div className='flex justify-center items-center min-h-[80vh]'>
       <SignUp  signInUrl="login" />
        </div>
  );
}

export default RegisterPage;
