import React from 'react'

const DashboardCard = ({icon, name, length}) => {
  return (
    <div className='flex w-fit h-fit p-2 my-auto text-slate-900 bg-green-400 rounded-md'>
      <div className='my-auto text-xl '> {icon} </div>
      <h6 className='mx-1' >{name}</h6>
      <h6 className='' >({length})</h6>
    </div>
  )
}

export default DashboardCard