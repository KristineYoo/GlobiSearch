import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import languages from './DropdownLanguages';
import LanguageIcon from '@mui/icons-material/Language';

export default function LangaugeSelect() {
    return (
        <Autocomplete
            disablePortal
            options={languages}
            sx={{
                color: 'white',
                border: 1,
                borderRadius: 7,
                width: 200,
                zIndex: 12,
                position: 'relative',
                marginLeft: 134.7,
                marginTop: -7.4,
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    InputProps={{
                        ...params.InputProps,
                        style: { color: 'white' },
                        startAdornment: <LanguageIcon style={{ color: 'white' }} />
                    }}
                    placeholder="Auto-select"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { border: "none" },
                            "&:hover fieldset": { border: "none" },
                            "&.Mui-focused fieldset": { border: "none" }
                        }
                    }}
                />
            )}
        />
    );
}
