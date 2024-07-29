
import { Link } from "react-router-dom"

export const Room = () => {



    return <div className="h-screen flex justify-center flex-col">
         <div className="grid grid-cols-2 p-5 content-normal ">

             <Link to="/create"> 
    <div className="w-full rounded-lg bg-red-500 p-10 m-10 flex justify-center">
       
         <button  className="">
           
            Create Meeting
         </button>
        </div>
        </Link>


         <Link to="/join">
        <div className="rounded-lg bg-green-500 p-10 m-10 flex justify-center">

         <button className="">Join Meeting</button>
         </div>
         </Link>

         {/* </div> */}
         </div>
    </div>
}