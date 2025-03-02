import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import languages from './DropdownLanguages';
import LanguageIcon from '@mui/icons-material/Language';

export default function LanguageSelect() {
    const [selectedLanguages, setSelectedLanguages] = React.useState([]);
    const handleChange = (event, newValue) => {
        setSelectedLanguages(newValue);
    };


    return (
        <Autocomplete
            multiple
            disablePortal
            options={languages}
            getOptionLabel={(option) => option.label}
            value={selectedLanguages}
            onChange={handleChange}
            isOptionEqualToValue={(option, value) => option.label === value.label}
            sx={{
                color: 'white',
                border: 1,
                borderRadius: 7,
                width: 280,
                zIndex: 12,
                position: 'relative',
                marginLeft: 124.9,
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
                    placeholder="Select languages"
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
