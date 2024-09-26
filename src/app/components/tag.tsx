
import React from 'react'

export interface Tag {
    id:number;
    name:string;
}

function TagComponets({tag}:{tag:Tag}) {

  return (
    <div className='text-center bg-emerald-200'>
        <h3>{tag.name}</h3>
    </div>
  )
};

export default TagComponets;