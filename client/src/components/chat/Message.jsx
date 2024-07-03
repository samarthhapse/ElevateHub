import React from 'react'

const Message = ({message, fromUser}) => {
  return (
    <div className=' max-w-3/5 '>
        {message}
    </div>
  )
}

export default Message