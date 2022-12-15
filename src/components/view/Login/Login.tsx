import React from 'react'

function Login() {
  const link = "https://api.intra.42.fr/oauth/authorize?client_id=u-s4t2ud-8a0e6a5b0b7287a0e61e71c4f35dd18120e36602486567de55f9ca1ba9c7aabf&redirect_uri=https%3A%2F%2Fgoogle.com&response_type=code"
  return (
    <div className='flex items-center justify-center w-[100vw] h-[100vh] bg-login-gradient'>
        <div className='flex flex-col h-96 w-96 justify-around items-center backdrop-blur-sm bg-white/30 rounded-xl px-2 py-2'>
            <h1 className='font-extrabold text-2xl text-center'>Login To Your Account</h1>
            <a  href={link} target='_blank' className='bg-black px-3 py-3 rounded-xl hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'> <code>Login with 42  Account</code></a>
            <h1 className='font-extralight text-2xl text-center'>Begin Your Journey</h1>

        </div>
    </div>
  )
}

export default Login