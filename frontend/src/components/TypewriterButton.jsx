import Typewriter from './Typewriter';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';

const pageHeight = window.innerHeight;

function TypewriterButton() {
    const texts=["Who is Chang'E?", "嫦娥とは誰ですか", "qui est Chang'E" , "嫦娥是谁", "How to make pho?", "Come fare il pho?", 
    "¿Cómo hacer pho?", "Cách làm phở?", "Why did North and South Korea separate?", "لماذا انفصلت كوريا الشمالية والجنوبية؟",
    "Por que a Coreia do Norte e a Coreia do Sul se separaram?","남북한은 왜 갈라졌나?", "Best places to go in Russia", 
    "Rusya'da gidilecek en iyi yerler", "रूस में जाने के लिए सबसे अच्छी जगहें", "Лучшие места для отдыха в Pоссии"]
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
            <Button fullWidth onClick={handleClick} variant="contained" sx={{ "&:hover": {backgroundColor: "transparent", 
            boxShadow: 'inset 0 0 0 1px #B983FF30, inset 0 -5px 11px #9b5ef7'}, 
            borderRadius: 8, justifyContent: 'center', height:50, textTransform: 'none', 
            backgroundColor: "transparent", boxShadow: 'inset 0 0 0 1px #B983FF30, inset 0 -5px 11px #9b5ef7',  zIndex: 10}}>
                <Typewriter strings={texts} speed={70} delay={1500}/>
            </Button>
            <SearchIcon sx={{ position:'absolute', top:'10px', right:'10px',  zIndex: 5 }}/>
            </Box>
        </>
    )
}

export default TypewriterButton;