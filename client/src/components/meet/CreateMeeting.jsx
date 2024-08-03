
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_URLS = "http://localhost:8080";

export const CreateMeeting = () => {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);

   const createMeetings = async () => {
    setLoading(true);
    const response = await axios.get(`${API_URLS}/new-meeting`);
    setLoading(false);
     navigate(`/room/${response.data.meetingId}`);
  };



    return <div className="h-screen flex justify-center flex-col" >
    
      <div className='max-w-md bg-red-500 p-5 rounded-lg'>
      <button onClick={createMeetings} disabled={loading}>
        {loading ? 'Creating...' : 'Create Meeting'}
      </button>
    </div>   
     </div>
}