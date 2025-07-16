import React from 'react'
import Loader from './components/loader/Loader'

function Loading() {
  return (
    <div className='h-screen fixed top-0 left-0 w-full bg-black text-center grid place-items-center text-2xl'><Loader /></div>
  )
}

export default Loading