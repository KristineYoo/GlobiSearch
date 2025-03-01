import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import languages from './DropdownLanguages';

export default function LangaugeSelect() {
    return (
        <Autocomplete
            disablePortal
            options={languages}
            placeholder="Languages"
            sx={{ color: 'white', border: 1, borderRadius: 3, width: 170, zIndex: 12, position: 'absolute', marginLeft: '81.35%', marginTop: -7.4 }}
            renderInput={(params) =>
                <TextField {...params}
                    defaultValue="Prompt"
                    InputProps={{ ...params.InputProps, style: { color: 'White' } }}



                />}
        />
    );
}