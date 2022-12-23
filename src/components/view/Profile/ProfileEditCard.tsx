import React from 'react'
import Acheivements from './Acheivements'
import ProfileImage from './ProfileImage'
export function ProfileEditCard() {
  return (
    <div className='col-span-2 bg-[#242424] ring-2 ring-gray-600 ring-offset-1 rounded-md w-full  flex flex-col items-center justify-evenly  px-4 pt-12 pb-6'>
      <div className='flex flex-col items-center justify-between ring-2 ring-gray-600 ring-offset-1 rounded-md px-2 sm:px-12 pt-12 pb-6 shadow-lg shadow-slate-700 w-3/4 space-y-8' >
        <ProfileImage />
        <div className="mb-3 w-full">
          <label htmlFor="formFile" className="form-label inline-block mb-2">Choose your Image</label>
          <input className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" />
        </div>
        <div className="flex w-full justify-center">
          <div className="mb-3 w-full">
            <label htmlFor='exampleText0' className="form-label inline-block mb-2 ">Name</label>
            <input
              type="text"
              className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
                 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleText0"
              placeholder="Mohamed El Hadjaoui"
            />
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="mb-3 w-full">
            <label className="form-label inline-block mb-2 ">About You</label>
            <textarea
              className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlTextarea1"
              rows={3}
              onChange={(e) => {


              }}
              placeholder="Your message"
            ></textarea>
          </div>
        </div>

        <div className="flex items-center pl-4 rounded border border-gray-200 w-full ">
          <input id="bordered-checkbox-1" type="checkbox" value="" name="bordered-checkbox" className="w-4 h-4 r accent-purple-600  border-purple-500
               focus:ring-2 d"/>
            <label htmlFor="bordered-checkbox-1" className="py-4 ml-2 w-full  font-bold overflow-auto">Enable 2 Step Verification</label>
        </div>
        <button className="bg-login-gradient  rounded-lg px-12 py-2 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" typeof='button'>
          Save</button>
      </div>


      <Acheivements />

    </div>
  )
}

