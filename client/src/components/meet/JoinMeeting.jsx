
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const JoinMeeting = () => {
    const [roomId, setRoomId]  = useState('');
    const navigate = useNavigate();

    const joinMeetings = () => {
        if (roomId.trim()) {
         navigate(`/room/${roomId}`);
        }
      };
  return (
    <div className="h-screen flex justify-center flex-col text-black" >
        
        <input
        className='p-2 m-2'
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Enter Meeting ID"
      />
      
      <div className='flex justify-center mt-8 w-full text-white bg-green-500 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2'>
      <button onClick={joinMeetings}>Join Meeting</button>

      </div>
    </div>
   
  );
};


