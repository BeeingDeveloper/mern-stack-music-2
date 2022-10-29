import React, { useContext } from 'react'
import {StateContext} from '../context/StateProvider'
import DashboardUserCard from './ChilidComponents/DashboardUserCard';


const DashboardUser = () => {
  const {state} = useContext(StateContext);
  const {allUsers} = state;


  
  return (
    <div className='h-auto w-10/12 pb-3 bg-red-400 m-auto relative top-10 rounded-xl'>
      <div className='flex justify-evenly h-10 w-full m-auto bg-red-500 rounded-t-xl'>
        <h6 className=' w-18 text-center my-auto text-xl'>Image</h6>
        <h6 className=' w-60 text-center my-auto text-xl'>Name</h6>
        <h6 className=' w-40 text-center my-auto text-xl'>Email</h6>
        <h6 className=' w-40 text-center my-auto text-xl'>Verified</h6>
        <h6 className=' w-40 text-center my-auto text-xl'>Created At</h6>
        <h6 className=' w-40 text-center my-auto text-xl'>Role</h6>
      </div>
      {
        allUsers && (
          allUsers?.map((elm)=>{   
            return(
              <DashboardUserCard key={elm._id} userId={elm._id} image={elm.imageURL} name={elm.name} email={elm.email} verified={elm.email_verified} createdAt={elm.createdAt} role={elm.role} />
            )
          })
        )

      }
    </div>
  )
}

export default DashboardUser