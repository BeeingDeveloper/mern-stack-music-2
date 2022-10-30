import React from 'react'

const FilterButton = (props) => {
  return (
    <div className=' bg-slate-100 text-slate-900 m-2 px-2 rounded-md' >
      {props.flag}
    </div>
  )
}

export default FilterButton