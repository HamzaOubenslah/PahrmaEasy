import React from 'react'
import RegisterForm from './components/RegisterForm'

const RegisterPage = () => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#ECF6FF] px-4 py-8">
  <div className="flex-1 flex flex-col items-center justify-center max-w-md w-full">
    <div className="text-center mb-8">
      <h4 className="text-[#39DB74] text-[40px] font-bold mb-[16px]">
        Pharma<span className="text-[#000000]">Easy</span>
      </h4>
      <p className="font-inter font-semibold text-[#757474] text-[16px]">
        Créez votre compte en quelques étapes
      </p>
    </div>
    <RegisterForm />
  </div>
</div>
  )
}

export default RegisterPage