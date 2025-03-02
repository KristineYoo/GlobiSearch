import { Box } from '@mui/material';
import LanguageSelect from './DropdownPromptBox';
import TextfieldBox from './TextfieldBox';
import { useState, useEffect } from 'react';
import axios from 'axios';
import ResultGrid from './ResultGrid';

export default function PromptBox() {
    const [textInput, setTextInput] = useState('');
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleSave = () => {
        if (textInput.trim() || selectedLanguages.length > 0) {
            // Save both pieces of data here
            const request={
                search_query: textInput,
                languages: selectedLanguages
            };
            console.log(request)
            axios.post("http://localhost:5000/api/get-search-result", request, {headers: {'Content-Type': 'application/json'}} )
            .then((res) => {
            console.log(res.data)
            console.log(res.data.topResults); // Log for debugging
            setData(res.data || []); // Assuming the response is like { items: [...] }
            setLoading(false)
            })
            .catch((err) => console.log(err));
            // You can replace console.log with your saving logic (e.g., API call)
            setTextInput('');
            setSelectedLanguages([]);
            console.log(data)
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
            <h2>Top three results</h2>
            {loading !== true &&  <ResultGrid items={data}></ResultGrid>}
        </div>
    );
}