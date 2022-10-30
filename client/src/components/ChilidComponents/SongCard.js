import React from 'react'
import {MdDeleteForever} from 'react-icons/md';
import {motion} from 'framer-motion'

const SongCard = (props) => {
    // let name = props.name;
  return (
    <motion.div  whileHover={{scale: 0.98}} className='w-52 h-60 m-3 rounded-xl bg-slate-300 transition-all duration-150 hover:shadow-2xl hover:shadow-red-500'>
        <motion.img className='h-40 w-44 m-auto mt-2 rounded-xl bg-green-500' src={props.imageURL} />
        <p className='w-40 m-auto text-slate-900 font-bold' >{props.name.length >25 ? `${props.name.slice(0, 25)}...` : `${props.name}` }</p>
        <p className='w-40 m-auto text-slate-700 font-semibold text-xs' >- {props.name.artist >25 ? `${props.artist.slice(0, 25)}...` : `${props.artist}` }</p>
        <div>
            <MdDeleteForever className='text-red-600 hover:text-red-500 h-7 w-7' />
        </div>
    </motion.div>
  )
}

export default SongCard