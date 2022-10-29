import React, { useContext, useId } from 'react'
import { StateContext } from '../../context/StateProvider';

const DashboardUserCard = ({key, userId, image, name, email, verified, createdAt, role}) => {
    
    const {state, dispatch} = useContext(StateContext);

    let newDate = new Date(createdAt).toLocaleDateString();

    console.log(userId)
    return (
    <>
    <div className='flex justify-evenly mt-1 h-14 w-full m-auto text-slate-900 rounded-t-xl' >
        <img src={image} className='rounded-3xl h-10 w-10 ' />
        <h6 className='w-60 text-center my-2'>{name}</h6>
        <h6 className='w-40 text-center my-2'> {email} </h6>
        <h6 className='w-40 text-center my-2'>{verified} </h6>
        <h6 className='w-40 text-center my-2'> {newDate} </h6>
        <h6 className='w-[10rem] flex text-center my-2 text-xl'> {role}
        
            <h6 className='text-center mt-2 text-sm'> 
            {
                state.user?.user?._id !== userId ? (
                    <p className=' text-slate-100 bg-red-500 px-2 rounded-md ml-4 ' >
                        {role === "admin" ? "member" : "admin"}
                    </p>
                ) :
                (
                    <p></p>
                )
            }
            </h6>        
        </h6>



    </div>
    <div className='h-[1px] relative top-[-6px] w-full bg-black'></div>
    </>
  )
}

export default DashboardUserCard