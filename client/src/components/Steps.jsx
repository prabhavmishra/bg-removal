import React from 'react'
import { assets } from '../assets/assets'
const Steps = () => {
  return (
    <div className='mx-4 lg:mx-44 py-20 xl:py-40'>
        <h1 className='text-center text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold bg-linear-to-r from-gray-900 to-gray-400 text-transparent bg-clip-text'>Steps to Remove Background <br/>from Image in Seconds</h1>
        <div className='flex items-start flex-wrap gap-2 mt-16 xl:mt-24 justify-center'>

            <div className='flex items-start gap-4 bg-white border border-gray-100 drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
                <img className='max-w-9' src={assets.upload_icon} alt="step_1" />
                <div>
                    <p className='text-xl font-medium'>Upload image</p>
                    <p className='text-sm text-neutral-500 mt-1'>Upload any kind of image format here</p>
                </div>
            </div>
            <div className='flex items-start gap-4 bg-white border border-gray-100 drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
                <img className='max-w-9' src={assets.remove_bg_icon} alt="step_1" />
                <div>
                    <p className='text-xl font-medium'>Remove background</p>
                    <p className='text-sm text-neutral-500 mt-1'>Upload any kind of image format here</p>
                </div>
            </div>
            <div className='flex items-start gap-4 bg-white border border-gray-100 drop-shadow-md p-7 pb-10 rounded hover:scale-105 transition-all duration-500'>
                <img className='max-w-9' src={assets.download_icon} alt="step_1" />
                <div>
                    <p className='text-xl font-medium'>Download image</p>
                    <p className='text-sm text-neutral-500 mt-1'>Upload any kind of image format here</p>
                </div>
            </div>

        </div>
    </div>
  )
}

export default Steps
