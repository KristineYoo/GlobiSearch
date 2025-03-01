import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function TextfieldBox() {
    return (

        <Box
            component="form"
            sx={{
                position: 'relative',
                zIndex: 10,
                color: 'white',
                border: 1,
                borderRadius: 3,
                '& .MuiTextField-root': { width: '100%' },

            }}

            noValidate
            autoComplete="off"

        >

            <TextField
                id="promptBox-text"
                multiline
                rows={1}
                defaultValue="Prompt"
                InputProps={{ style: { color: 'white' } }}
            />


        </Box>



    );
}
