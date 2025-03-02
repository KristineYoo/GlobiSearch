import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

export default function TextfieldBox() {
    return (
        <Box
            sx={{
                position: 'relative',
                zIndex: 10,
                color: 'white',
                border: 2,
                borderRadius: 7,
                '& .MuiTextField-root': { width: '100%' },
                outline: 'none',
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                InputProps={{
                    style: { color: 'white' },
                    startAdornment: <ManageSearchIcon style={{ color: 'white' }} />,
                }}
                id="promptBox-text"
                multiline
                rows={1}
                placeholder="Enter your prompt..."
                sx={{
                    "& .MuiOutlinedInput-root": {
                        "& fieldset": { border: "none" },
                        "&:hover fieldset": { border: "none" },
                        "&.Mui-focused fieldset": { border: "none" }
                    },
                    "#promptBox-text": {
                        marginLeft: '20px',
                    }
                }}
            />
        </Box>
    );
}
