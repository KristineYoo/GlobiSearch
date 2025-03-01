import Typewriter from './Typewriter';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

const pageHeight = window.innerHeight;

function TypewriterButton() {
    const texts=["We are here to help!", "以 一百三多种语言进行搜索", "Comment pouvons-nous vous aider"]
    function handleClick() {
        console.log("Clicked");
        window.scrollTo({
            top: pageHeight,
            left: 0,
            behavior: 'smooth'
        });
    }
    return (
        <>
            <Box  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width:1/2, position: 'relative'}} >
            <Button fullWidth onClick={handleClick} variant="contained" sx={{ "&:hover": {backgroundColor: "transparent", boxShadow: 'inset 0 0 0 1px #B983FF30, inset 0 -5px 11px #9b5ef7'}, borderRadius: 8, justifyContent: 'center', height:50, textTransform: 'none', backgroundColor: "transparent", boxShadow: 'inset 0 0 0 1px #B983FF30, inset 0 -5px 11px #9b5ef7'}}><Typewriter strings={texts} speed={100} delay={1500}/></Button>
            <SearchIcon sx={{ position:'absolute', top:'10px', right:'10px' }}/>
            </Box>
        </>
    )
}

export default TypewriterButton;