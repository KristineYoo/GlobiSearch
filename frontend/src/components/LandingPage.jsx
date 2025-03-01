import './LandingPage.css';
import TryNowButton from './TryNowButton';
import Typewriter from './Typewriter';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


function LandingPage(){

  const texts=["We are here to help!", "以 一百三多种语言进行搜索", "Comment pouvons-nous vous aider"]

    return (
        <>
        <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="shadow" style={{ marginBottom: '10px' }}></div>
            <h1 className="sora-medium" style={{ marginBottom: 'auto'}}>Discover Answers in Every Language—<span className="text-span-gradient">Instantly</span></h1>
            <h2 className="sora-light" style={{ color: "#F2F2F2", display: 'flex', alignItems: 'center', gap: '10px' }}>
              Your AI search engine to find information in 50+ languages
              <span role="img" aria-label="globe">🌐</span>
            </h2>
            <Box  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width:1/2}} >
            <Button fullWidth variant="contained" sx={{ borderRadius: 8, justifyContent: 'center', height:70, textTransform: 'none'}}><Typewriter strings={texts} speed={100} delay={1500}/></Button>
            </Box>
            <TryNowButton />
          </div>
        </div>
        <div style={{height: '100vh'}}>
        </div>
        </>
      )
}

export default LandingPage;