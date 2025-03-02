import { Box } from '@mui/material';
import LanguageSelect from './DropdownPromptBox';
import TextfieldBox from './TextfieldBox';
import { useState, useEffect } from 'react';

export default function PromptBox() {
    const [textInput, setTextInput] = useState('');
    const [selectedLanguages, setSelectedLanguages] = useState([]);

    const handleSave = () => {
        if (textInput.trim() || selectedLanguages.length > 0) {
            // Save both pieces of data here
            console.log('Saving data:', {
                text: textInput,
                languages: selectedLanguages
            });
            // You can replace console.log with your saving logic (e.g., API call)
            setTextInput('');
            setSelectedLanguages([]);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSave();
        }
    };

    // Add global keypress listener
    useEffect(() => {
        window.addEventListener('keypress', handleKeyPress);
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, [textInput, selectedLanguages]);

    return (
        <div style={{ border: 'none' }}>
            <TextfieldBox
                value={textInput}
                onChange={setTextInput}
                onSave={handleSave}
            />
            <LanguageSelect
                selectedLanguages={selectedLanguages}
                onLanguageChange={setSelectedLanguages}
                onSave={handleSave}
            />
        </div>
    );
}