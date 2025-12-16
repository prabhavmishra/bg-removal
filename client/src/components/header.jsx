import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex items-center justify-between max-sm:flex-col-reverse gap-y-10 px-4 mt-10 lg:px-44 sm:mt-20'>
       {/* --------left side-------- */}
       <div className='flex flex-col gap-6'>
        <h1 className='text-4xl xl:text-5xl 2xl:text-6xl font-bold text-neutral-700 leading-tight'>
          Remove the <br className='max-md:hidden'/> <span className='bg-linear-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text'>Background </span> from <br className='max-md:hidden'/> Images for Free
        </h1>
        <p className='text-gray-500 text-lg max-w-md'>Remove background from image with AI</p>
        <div>
          <input type="file" id='upload1' hidden />
          <label className='inline-flex gap-3 px-8 py-3.5 rounded-full cursor-pointer bg-linear-to-r m-auto from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300' htmlFor="upload1">
            <img width={20} src={assets.upload_btn_icon} alt="upload_btn_icon" />
            <p className='text-white text-sm'>Upload your Image</p>
          </label>
        </div>
       </div>
       {/* --------right side-------- */}
       <div className='w-full max-w-md'>
        <img src={assets.header_img} alt="header" />
       </div>
    </div>
  )
}

export default Header
