import React from 'react'
import avtar from '../../../assets/avatar.jpeg'

type CardPorps = 
{
    data : {
        name:string
        avatar:string
        about:string
        id:number
        active:string
    }
}


function Card({data} : CardPorps) {

  
        let BgColour = "";
        switch (data.active) {
            case "on": 
                BgColour = "bg-green-500";
                break;
            case "in":
                BgColour = " bg-orange-500";
                break;
            default:
                BgColour = "bg-red-500"
        
    }
    return (
        <div className="flex items-center space-x-4 py-7 hover:bg-login-gradient px-4 rounded-lg cursor-pointer">

            <div className="flex-shrink-0 relative ">
                <div className={` h-2 w-2 ${ BgColour} absolute top-2  right-0 ring-white ring-4 rounded-full`}></div>
                <img src={data.avatar} alt="avatar" className=' h-12 rounded-full ring-2 ring-offset-2  shadow-lg shadow-gray-700' />

            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium ">
                    {data.name}
                </p>
                <p className="text-sm  truncate">
                    {data.about}
                </p>
            </div>
            {/* <div className="inline-flex items-center text-base font-semibold">
                <div className='w-6 bg-red-600 rounded-lg text-center font-bold'>1</div>
            </div> */}
        </div>
    )
}

export default Card