import React from 'react'
import Image from 'next/image';

interface Props {
    children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  return (
    <div className='flex items-center h-dvh w-dvw relative'>
      <div className='w-[400px] bg-black bg-opacity-60 flex flex-col items-center justify-center z-20 h-full p-10'>
        {children}
        <div className='h-[1px] w-full bg-dark mt-3'/>
        <button className='mt-5 bg-dark hover:bg-[#292929] duration-200 transition-all flex items-center w-full p-1'>
          <div className='bg-white p-3'>
          <Image src={'/icons/google.png'} width={30} height={30} alt='google'/>
          </div>
          <p className='text-sm px-3 text-center w-full'>Sign In with Google</p>
        </button>
      </div>
      <div className='w-full h-full absolute'>
        <Image src={'/about.webp'} width={3200} height={1800} alt='auth image' className='object-cover object-center h-full'/>
      </div>
    </div>
  )
}

export default AuthLayout