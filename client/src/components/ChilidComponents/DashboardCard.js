import React from 'react'
import {motion} from 'framer-motion';


const DashboardCard = ({icon, name, length}) => {
  return (
    <motion.div className='flex w-fit h-fit p-2 my-auto text-slate-900 bg-green-400 rounded-md cursor-pointer shadow-2xl shadow-green-300'
                transition={{duration: 0.1}}
                whileHover={{scale: 0.95}}
                >
      <div className='my-auto text-xl '> {icon} </div>
      <h6 className='mx-1' >{name}</h6>
      <h6 className='' >({length})</h6>
    </motion.div>
  )
}

export default DashboardCard