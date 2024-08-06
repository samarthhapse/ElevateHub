import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function CustomButton() {
  return (
    <div style={{
        marginTop: 40,
        marginLeft: "80%"
    }}>
        <Stack spacing={2} direction="row">
        <Button onClick={()=>{window.open('http://localhost:5000', '_blank');}} variant="contained">Join Meeting</Button>
        </Stack>
    </div>
    
  );
}

