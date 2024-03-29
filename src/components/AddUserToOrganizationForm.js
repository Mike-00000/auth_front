import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { styled } from '@mui/styles';

function AddUserToOrganizationForm() {
  const [userEmail, setUserEmail] = useState('');
  const [orgName, setOrgName] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ userEmail, orgName });
    // const userData = { userEmail, orgName };
    const userData = { 
      user_email: userEmail, 
      org_name: orgName      
    };
    

    try {
      const response = await fetch('http://127.0.0.1:5000/add-user-to-org', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('access_token')}`, 
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Request failed with status ' + response.status);
      }

      const responseData = await response.json();
      console.log(responseData);
      // à l'occasion, rajouter un message de succès !

      setUserEmail('');
      setOrgName('');
    } catch (error) {
      console.error('Error during submission:', error);
      // à l'occasion, rajouter des messages d'erreurs !
    }
  };

  return (
    <Paper style={{ padding: '2rem', margin: '2rem auto', width: '35%' }}>
      <Typography variant="h5">Add User to Organization</Typography>
      <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
        <TextField
          label="User Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          required
        />
        <TextField
          label="Organization Name"
          type="text"
          variant="outlined"
          fullWidth
          margin="normal"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          required
        />
        <Box marginTop={2}>
          <Button type="submit" color="primary" variant="contained">
            Add User
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default AddUserToOrganizationForm;
