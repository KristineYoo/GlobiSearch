import './TryNowButton.css';
import Button from '@mui/material/Button';

const pageHeight = window.innerHeight;

function TryNowButton() {
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
            <div>
                <Button onClick={handleClick} variant="contained" className="sora try-now-button" style={{ marginTop: '20px', width: '200px', height: '50px', 
                    borderRadius: '25px', backgroundColor: '#A970FF', color: '#f2f2f2', fontSize: '20px', letterSpacing: '0px', 
                    textTransform: 'none', fontWeight: '300', wordSpacing: '2.5px', boxShadow: 'inset 0 0 0 1px #B983FF30, inset 0 -5px 11px #9b5ef7' }}>Try it out</Button>
            </div>
        </>
    )
}

export default TryNowButton;