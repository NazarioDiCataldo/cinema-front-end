import React from 'react'

type NotFoundProps = {
    text: string
}

const NotFound = ({text}: NotFoundProps) => {
  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center gap-4'>
        <p className='text-xl font-medium'>{text}</p>
        <span>Search for another name or check for typos</span>
    </div>
  )
}

export default NotFound